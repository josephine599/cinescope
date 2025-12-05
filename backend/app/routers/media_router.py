from fastapi import APIRouter, HTTPException, Request, Response
from fastapi.responses import StreamingResponse, FileResponse
import os
from pathlib import Path

router = APIRouter()

BASE_DIR = Path(__file__).resolve().parents[2]
MEDIA_DIR = BASE_DIR / "app" / "media"

def get_video_path(filename: str) -> Path:
    safe_name = os.path.basename(filename)
    path = MEDIA_DIR / safe_name
    if not path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    return path

@router.get("/watch/{filename}")
async def watch_video(request: Request, filename: str):
    file_path = get_video_path(filename)
    file_size = os.path.getsize(file_path)

    range_header = request.headers.get("range")
    if not range_header:
        return FileResponse(file_path, media_type="video/mp4")

    range_value = range_header.replace("bytes=", "")
    start, end = range_value.split("-")
    start = int(start) if start else 0
    end = int(end) if end else file_size - 1

    def iterfile():
        with open(file_path, "rb") as f:
            f.seek(start)
            yield f.read(end - start + 1)

    headers = {
        "Content-Range": f"bytes {start}-{end}/{file_size}",
        "Accept-Ranges": "bytes",
        "Content-Length": str(end - start + 1),
        "Content-Type": "video/mp4",
    }

    return StreamingResponse(iterfile(), status_code=206, headers=headers)

@router.get("/download/{filename}")
async def download_video(filename: str):
    file_path = get_video_path(filename)
    return FileResponse(file_path, filename=filename)
