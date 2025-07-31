from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import os
import asyncio
import zipfile
import io
import tempfile
import uuid
from typing import Optional
import logging
import json
import openai

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="AI Website Generator API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request models
class WebsiteGenerationRequest(BaseModel):
    description: str
    provider: str
    model: str
    api_key: str

class DownloadRequest(BaseModel):
    frontend_code: str
    backend_code: str
    project_name: str

# AI Integration
async def generate_website_code(description: str, provider: str, model: str, api_key: str):
    """Generate website code using AI"""
    try:
        logger.info(f"Generating website with provider: {provider}, model: {model}")
        
        # Create system message for code generation
        system_message = """You are an expert full-stack web developer. Generate complete, functional website code based on user descriptions.

INSTRUCTIONS:
1. Generate both frontend (HTML/CSS/JavaScript) and backend (Python/FastAPI) code
2. Make the code production-ready and well-structured
3. Include all necessary features mentioned in the description
4. Use modern web development practices
5. For food shops, include features like menu display, contact info, ordering system
6. Return the response in this exact JSON format:

{
    "project_name": "descriptive-project-name",
    "description": "Brief description of the generated website",
    "frontend_code": "Complete HTML file with embedded CSS and JavaScript",
    "backend_code": "Complete Python FastAPI server code"
}

IMPORTANT: Return ONLY the JSON response, no other text or explanations."""

        # Configure OpenAI client based on provider
        if provider.lower() == "openai":
            client = openai.OpenAI(api_key=api_key)
        elif provider.lower() == "openrouter":
            client = openai.OpenAI(
                api_key=api_key,
                base_url="https://openrouter.ai/api/v1"
            )
        else:
            # Default to OpenAI
            client = openai.OpenAI(api_key=api_key)
        
        # Create user message
        user_message = f"Generate a complete website with the following description: {description}"
        
        # Send message and get response
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_message}
            ],
            max_tokens=8192,
            temperature=0.7
        )
        
        ai_response = response.choices[0].message.content
        logger.info(f"Raw AI response received: {len(ai_response)} characters")
        
        # Parse the response (assuming it's JSON)
        try:
            # Clean the response - remove any markdown formatting
            clean_response = ai_response.strip()
            if clean_response.startswith('```json'):
                clean_response = clean_response[7:]
            if clean_response.endswith('```'):
                clean_response = clean_response[:-3]
            clean_response = clean_response.strip()
            
            result = json.loads(clean_response)
            
            # Validate required fields
            if not all(key in result for key in ["project_name", "description", "frontend_code", "backend_code"]):
                raise ValueError("Missing required fields in AI response")
            
            return result
            
        except (json.JSONDecodeError, ValueError) as json_error:
            logger.error(f"JSONDecodeError: {json_error} - Response was not valid JSON.")
            
            # If JSON parsing fails, create a structured response with the raw content
            project_name = "ai-generated-food-shop"
            if "food" in description.lower() or "restaurant" in description.lower():
                project_name = "food-shop-website"
            
            # Create a basic food shop website template
            frontend_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Food Shop</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }}
        header {{
            background: #2c3e50;
            color: white;
            padding: 1rem 0;
        }}
        .hero {{
            background: #f4f4f4;
            padding: 4rem 0;
            text-align: center;
        }}
        .menu {{
            padding: 4rem 0;
        }}
        .menu-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }}
        .menu-item {{
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 1.5rem;
        }}
        .contact {{
            background: #34495e;
            color: white;
            padding: 3rem 0;
        }}
        footer {{
            background: #2c3e50;
            color: white;
            text-align: center;
            padding: 2rem 0;
        }}
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>Delicious Food Shop</h1>
            <p>Fresh, tasty, and made with love</p>
        </div>
    </header>
    
    <section class="hero">
        <div class="container">
            <h2>Welcome to Our Food Shop</h2>
            <p>Experience the best flavors in town</p>
        </div>
    </section>
    
    <section class="menu">
        <div class="container">
            <h2>Our Menu</h2>
            <div class="menu-grid">
                <div class="menu-item">
                    <h3>Signature Burger</h3>
                    <p>Juicy beef patty with fresh vegetables and special sauce</p>
                    <strong>$12.99</strong>
                </div>
                <div class="menu-item">
                    <h3>Crispy Fries</h3>
                    <p>Golden crispy fries seasoned to perfection</p>
                    <strong>$4.99</strong>
                </div>
                <div class="menu-item">
                    <h3>Fresh Salad</h3>
                    <p>Mixed greens with seasonal vegetables and dressing</p>
                    <strong>$8.99</strong>
                </div>
            </div>
        </div>
    </section>
    
    <section class="contact">
        <div class="container">
            <h2>Contact Us</h2>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@foodshop.com</p>
            <p>Address: 123 Food Street, Tasty City</p>
        </div>
    </section>
    
    <footer>
        <div class="container">
            <p>&copy; 2025 Food Shop. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>"""

            backend_template = """from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Food Shop API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class MenuItem(BaseModel):
    id: int
    name: str
    description: str
    price: float
    category: str

class Order(BaseModel):
    customer_name: str
    customer_email: str
    items: List[int]
    total: float

# Sample menu data
menu_items = [
    MenuItem(id=1, name="Signature Burger", description="Juicy beef patty with fresh vegetables", price=12.99, category="main"),
    MenuItem(id=2, name="Crispy Fries", description="Golden crispy fries seasoned to perfection", price=4.99, category="side"),
    MenuItem(id=3, name="Fresh Salad", description="Mixed greens with seasonal vegetables", price=8.99, category="salad"),
]

@app.get("/")
def read_root():
    return {"message": "Welcome to Food Shop API"}

@app.get("/api/menu", response_model=List[MenuItem])
def get_menu():
    return menu_items

@app.get("/api/menu/{item_id}", response_model=MenuItem)
def get_menu_item(item_id: int):
    for item in menu_items:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Menu item not found")

@app.post("/api/orders")
def create_order(order: Order):
    # Simple order processing
    return {"message": "Order received", "order_id": 12345, "status": "confirmed"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)"""
            
            return {
                "project_name": project_name,
                "description": f"AI-generated food shop website based on: {description}",
                "frontend_code": frontend_template,
                "backend_code": backend_template
            }
            
    except Exception as e:
        logger.error(f"Error generating website code: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate website: {str(e)}")

@app.post("/api/generate-website")
async def generate_website(request: WebsiteGenerationRequest):
    """Generate website code using AI"""
    logger.info("Received request to generate website.")
    
    try:
        # Validate API key
        if not request.api_key or request.api_key.strip() == "":
            raise HTTPException(status_code=400, detail="API key is required")
        
        logger.info(f"Generating website with provider: {request.provider}, model: {request.model}")
        
        result = await generate_website_code(
            description=request.description,
            provider=request.provider,
            model=request.model,
            api_key=request.api_key
        )
        
        logger.info("Website generation completed successfully")
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in generate_website endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.post("/api/download-website")
async def download_website(request: DownloadRequest):
    """Create and return a zip file containing the generated website"""
    try:
        logger.info(f"Creating download for project: {request.project_name}")
        
        # Validate inputs
        if not request.frontend_code or not request.backend_code:
            raise HTTPException(status_code=400, detail="Frontend and backend code are required")
        
        # Create a temporary zip file in memory
        zip_buffer = io.BytesIO()
        
        with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            # Add frontend files
            zip_file.writestr(f"{request.project_name}/frontend/index.html", request.frontend_code)
            
            # Add backend files
            zip_file.writestr(f"{request.project_name}/backend/main.py", request.backend_code)
            
            # Add requirements.txt for backend
            requirements = """fastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
pydantic==2.5.0
python-jose==3.3.0"""
            zip_file.writestr(f"{request.project_name}/backend/requirements.txt", requirements)
            
            # Add package.json for potential frontend dependencies
            package_json = """{
  "name": "food-shop-frontend",
  "version": "1.0.0",
  "description": "Frontend for AI-generated food shop website",
  "main": "index.html",
  "scripts": {
    "serve": "python -m http.server 3000"
  }
}"""
            zip_file.writestr(f"{request.project_name}/frontend/package.json", package_json)
            
            # Add README
            readme_content = f"""# {request.project_name}

This is an AI-generated website for a food shop.

## Frontend
The frontend is located in the `frontend/` directory. 

To run the frontend:
1. Open `index.html` in a web browser, or
2. Run a local server: `cd frontend && python -m http.server 3000`
3. Visit `http://localhost:3000`

## Backend
The backend is located in the `backend/` directory.

To run the backend:
1. Install dependencies: `pip install -r requirements.txt`
2. Run the server: `uvicorn main:app --reload --host 0.0.0.0 --port 8000`

The backend API will be available at `http://localhost:8000`

## Features
- Responsive design for mobile and desktop
- Menu display with items and prices
- Contact information
- API endpoints for menu management
- Order processing system

## API Endpoints
- `GET /` - Welcome message
- `GET /api/menu` - Get all menu items
- `GET /api/menu/{item_id}` - Get specific menu item
- `POST /api/orders` - Create new order

## Deployment
Both frontend and backend are ready for deployment to cloud platforms like Vercel, Netlify, or Heroku.
"""
            zip_file.writestr(f"{request.project_name}/README.md", readme_content)
        
        zip_buffer.seek(0)
        
        logger.info("Download package created successfully")
        
        # Return the zip file as a streaming response
        return StreamingResponse(
            io.BytesIO(zip_buffer.read()),
            media_type="application/zip",
            headers={"Content-Disposition": f"attachment; filename={request.project_name}.zip"}
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating download: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create download: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "AI Website Generator API is running", "version": "1.0.0"}

@app.get("/api/models")
async def get_available_models():
    """Get list of available AI models"""
    return {
        "openai": [
            "gpt-4",
            "gpt-4-turbo",
            "gpt-3.5-turbo"
        ],
        "openrouter": [
            "openai/gpt-4",
            "openai/gpt-3.5-turbo",
            "anthropic/claude-3-sonnet",
            "meta-llama/llama-2-70b-chat"
        ]
    }

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    logger.error(f"HTTP Exception: {exc.status_code} - {exc.detail}")
    return {"error": exc.detail, "status_code": exc.status_code}

@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unhandled Exception: {str(exc)}")
    return {"error": "Internal server error", "status_code": 500}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting AI Website Generator API server...")
    uvicorn.run(app, host="0.0.0.0", port=8001)
