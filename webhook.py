from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

# Configurar Gemini
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI(title="ChatBot OGE Webhook")

@app.get("/health")
async def health():
    """Health check del webhook"""
    return {"status": "healthy", "service": "ChatBot OGE Webhook"}

@app.post("/webhook")
async def webhook(request: Request):
    """Webhook principal - maneja todas las intenciones"""
    print("=" * 50)
    print("WEBHOOK RECIBIDO")
    print("=" * 50)
    try:
        body = await request.json()
        print(f"✓ Body recibido correctamente")
        print(f"Intent: {body.get('queryResult', {}).get('intent', {}).get('displayName', 'N/A')}")
        print(f"Query: {body.get('queryResult', {}).get('queryText', 'N/A')}")
        
        query_result = body.get("queryResult", {})
        query_text = query_result.get("queryText", "")
        intent = query_result.get("intent", {})
        intent_name = intent.get("displayName", "")
        
        # Debug: mostrar qué recibimos
        print(f"DEBUG - Intent recibido: '{intent_name}'")
        print(f"DEBUG - Query: '{query_text}'")
        
        response_text = "No entendí tu pregunta"
        
        # ===== INTENT: webhook =====
        if intent_name == "ProbandoWebHook":
            print(f"→ Entrando en intent ProbandoWebHook")
            print(f"→ GEMINI_API_KEY existe: {bool(GEMINI_API_KEY)}")
            if GEMINI_API_KEY:
                try:
                    print(f"→ Inicializando modelo Gemini...")
                    model = genai.GenerativeModel("gemini-2.5-flash")
                    prompt = f"""Eres un asistente académico de UNASAM OGE. Responde SOLO preguntas académicas de forma breve y clara.
Pregunta: {query_text}"""
                    print(f"→ Enviando prompt a Gemini...")
                    response = model.generate_content(prompt)
                    response_text = response.text
                    print(f"✓✓✓ RESPUESTA GENERADA: {response_text}")
                except Exception as e:
                    print(f"❌ ERROR generando con Gemini: {str(e)}")
                    response_text = f"Error: {str(e)}"
            else:
                response_text = f"Respuesta webhook: {query_text}"
                print(f"⚠ No hay API key, usando respuesta por defecto")
            
            return JSONResponse({
                "fulfillmentText": response_text,
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [response_text]
                        }
                    }
                ]
            })
        
        # ===== INTENT: saludo =====
        elif intent_name == "saludo":
            if GEMINI_API_KEY:
                model = genai.GenerativeModel("gemini-2.5-flash")
                prompt = f"Eres un asistente amable. Saluda y responde: {query_text}"
                response = model.generate_content(prompt)
                response_text = response.text
                print(f"✓ Respuesta Gemini: {response_text}")
            else:
                response_text = "Hola, ¿cómo te puedo ayudar?"
            
            return JSONResponse({
                "fulfillmentText": response_text,
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [response_text]
                        }
                    }
                ]
            })
        
        # ===== INTENT: noticias =====
        elif intent_name == "noticias":
            if GEMINI_API_KEY:
                model = genai.GenerativeModel("gemini-2.5-flash")
                prompt = f"Eres un asistente de noticias. Responde: {query_text}"
                response = model.generate_content(prompt)
                response_text = response.text
                print(f"✓ Respuesta Gemini: {response_text}")
            else:
                response_text = "Aquí están las noticias"
            
            return JSONResponse({
                "fulfillmentText": response_text,
                "fulfillmentMessages": [
                    {
                        "text": {
                            "text": [response_text]
                        }
                    }
                ]
            })
        
        # Respuesta por defecto si no coincide ningún intent
        return JSONResponse({
            "fulfillmentText": response_text,
            "fulfillmentMessages": [
                {
                    "text": {
                        "text": [response_text]
                    }
                }
            ]
        })
    
    except Exception as e:
        print(f"DEBUG - ERROR en webhook: {str(e)}")
        return JSONResponse({"fulfillmentText": f"Error: {str(e)}"}, status_code=400)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)





