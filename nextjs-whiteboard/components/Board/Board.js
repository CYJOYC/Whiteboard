import React, { useState, useEffect } from "react";
import "../board.module.css";
import { useRouter } from 'next/router';
import Controls from "../Controls/Controls";
import { auth, db } from '../../config/firebase';
import { useRequireAuth } from '../../hooks/useRequireAuth';


function Board() {
  const canvasRef = React.useRef(null);
  const parentRef = React.useRef(null);
  const [ctx, setCtx] = useState({});
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState("#000000");
  const router = useRouter();
  const galleryCode = router.query.galleryCode;
  const auth = useRequireAuth();
  const user = auth.user;

  useEffect(() => {
    let canv = canvasRef.current;
    canv.width = parentRef.current.offsetWidth;
    canv.height = parentRef.current.offsetHeight;

    let canvCtx = canv.getContext("2d");
    canvCtx.lineJoin = "round";
    canvCtx.lineCap = "round";
    canvCtx.lineWidth = 5;
    setCtx(canvCtx);

    let offset = canv.getBoundingClientRect();
    setCanvasOffset({ x: parseInt(offset.left), y: parseInt(offset.top) });
  }, [ctx]);

  function handleMouseDown(e) {
    setDrawing(true);
    setPosition({
      x: parseInt(e.clientX - canvasOffset.x),
      y: parseInt(e.clientY - canvasOffset.y),
    });
  }
  function handleMouseUp() {
    setDrawing(false);
  }

  function handleMouseMove(e) {
    let mousex = e.clientX - canvasOffset.x;
    let mousey = e.clientY - canvasOffset.y;
    if (drawing) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(position.x, position.y);
      ctx.lineTo(mousex, mousey);
      ctx.stroke();
    }
    setPosition({ x: mousex, y: mousey });
  }

  function handleColor(color) {
    setColor(color);
  }

  function createGallery(e) {
    e.preventDefault();
    var galleriesRef = db.ref("galleries");
    galleriesRef.push().set({
      '0000': {
        'name': 'testing', 
        'pictures': {
          
        }
      }
    });

  }

  function saveCanvas(e) {
    e.preventDefault(); 
    var dataURL = canvasRef.current.toDataURL();
    
    
    // uncomment this if you want to check that the correct image is being pulled. This will cause pressing the button to open the drawing in a new window as an image 
    // var w=window.open('about:blank','image from canvas');
    // w.document.write("<img src='"+dataURL+"' alt='from canvas'/>");

    // uncomment this for storing into firebase. I'm not too clear on how to do this-- I assume whoever configured it knows how. 
    // Code comes here: https://stackoverflow.com/questions/37873808/how-can-i-save-canvas-as-image-to-firebase-storage


    var picturesRef = db.ref("galleries/" + galleryCode + "/pictures");
    picturesRef.push().set({
      'creator': user.name, 
      'imageURL': dataURL,
      'comments':[
        {
            authorName: 'Ryan',
            createdAt: '2020-11-28T12:59-0500',
            text: 'How artistic!'
        },
        {
            authorName: 'Joy',
            createdAt:'2020-11-27T06:28-0500',
            text:'Great job!'
        }
    ] // a string of comments elements
    });

    const context = canvasRef.current.getContext('2d');

    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    console.log('The button was clicked.' + dataURL);
  }

  return (
    <div className="board" ref={parentRef}>
      <Controls handleColor={handleColor} />
      <canvas
        id="c"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
      <div>
        <button onClick={saveCanvas}>
            Save image to board 
        </button>
        <button onClick={createGallery}>
            Create/Reset test gallery 
        </button>
      </div>
    </div>
  );
}

export default Board;
