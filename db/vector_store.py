import os

try:
    import chromadb
    CHROMA_PATH = os.path.join(os.path.dirname(__file__), "..", "chroma_db")
    os.makedirs(CHROMA_PATH, exist_ok=True)
    chroma_client = chromadb.PersistentClient(path=CHROMA_PATH)
except ImportError:
    chroma_client = None
    print("Warning: chromadb not installed. Vector store will be disabled.")

def get_vector_collection(collection_name: str = "neuroflow_memory"):
    if not chroma_client:
        return None
    try:
        return chroma_client.get_or_create_collection(name=collection_name)
    except Exception as e:
        print(f"Error initializing ChromaDB collection: {e}")
        return None
