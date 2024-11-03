from fastapi import FastAPI, HTTPException, Depends, Request
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from fastapi import BackgroundTasks
import time


app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: bool = None

    def get_db():
        return {"db": "Simulated database connection"}
     
    @app.middleware("http")
    async def log_requests(request: Request, call_next):
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        print(f"Request: {request.url} - Duration: {process_time} seconds")
        return response
     

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"detail": exc.detail, "error": "An error occurred"}
     )
    
    @app.get("/items/{item_id}")
    def get_item(item_id: int, db=Depends(get_db)):
        if item_id not in [1, 2, 3]:  # Simulate item check
            raise HTTPException(status_code=404, detail="Item not found")
        return {"item_id": item_id, "db_connection": db["db"]}	
    
    @app.post("/items/")
    def create_item(item: Item, db=Depends(get_db)):
        return {"item": item, "db_connection": db["db"]}
    
    @app.put("/items/{item_id}")
    def update_item(item_id: int, item: Item, db=Depends(get_db)):
        if item_id not in [1, 2, 3]:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"item_id": item_id, "updated_item": item, "db_connection": db["db"]}
    
    @app.delete("/items/{item_id}")
    def delete_item(item_id: int, db=Depends(get_db)):
        if item_id not in [1, 2, 3]:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"detail": "Item deleted", "item_id": item_id, "db_connection": db["db"]}
    
    @app.get("/info/")
    def get_info():
        headers = {"X-Info-Version": "1.0", "X-Student-Task": "Create Custom Path"}
        return JSONResponse(content={"message": "Custom path created successfully!"}, headers=headers)

    @app.get("/items/{item_id}/with-discount/")
    def get_item_with_discount(item_id: int, discount: float = None, db=Depends(get_db)):
        if item_id not in [1, 2, 3]:
         raise HTTPException(status_code=404, detail="Item not found")
        item = {"item_id": item_id, "price": 100.0}  # Simulated item with price
        if discount:
         item["discounted_price"] = item["price"] * (1 - discount)
        return {"item": item, "db_connection": db["db"]}
    
    def background_task(item_id: int):
        time.sleep(5)  # Simulate long task
        print(f"Background task completed for item {item_id}")

    @app.post("/items/{item_id}/background-task/")
    def run_background_task(item_id: int, background_tasks: BackgroundTasks, db=Depends(get_db)):
        background_tasks.add_task(background_task, item_id)
        return {"message": "Background task started", "item_id": item_id, "db_connection": db["db"]}