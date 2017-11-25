attribute vec2 aPoint;
uniform vec2 uCanvasSize;

void main(void) {
  gl_Position = vec4(aPoint * mat2( 2.0/uCanvasSize.x,0, 0,-2.0/uCanvasSize.y ) + vec2(-1, 1), 0, 1);
}
