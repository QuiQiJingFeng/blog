
#ifdef GL_ES
varying lowp vec2 v_texCoord;
varying mediump vec2 v_position;
#else
varying vec2 v_texCoord;
varying vec2 v_position;
#endif
#define PI 3.1415926
uniform float time;
uniform float lineWidth;

uniform vec2 sourcePos;
uniform vec2 targetPos;
uniform vec2 resolution;

//参数为弧度
mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}

void main()
{   
    //将坐标转换到[0,1]
    vec2 sPos = sourcePos / resolution;
    vec2 tPos = targetPos / resolution;

    //将坐标系转换到[-1,1]
    vec2 texCoord = -1. + 2. * v_texCoord;  //[-1,1]
    sPos = -1. + 2. * sPos;  //[-1,1]
    tPos = -1. + 2. * tPos;  //[-1,1]
    
    //修正x方向坐标位置 因为对于屏幕像素来说X和Y并不是1:1的,所以这里需要修正一个方向
    float factor = resolution.x/resolution.y;
    texCoord.x *= factor;  

    sPos.x *= factor;
    tPos.x *= factor;

    float newLineWidth = lineWidth / resolution.y;
    vec4 color = vec4(0.0,0.0,0.0,1.0);

    float len = distance(sPos,tPos);  //线条的长度

    vec2 tempUv = texCoord;
    vec2 centerPos = (tPos + sPos) / 2.0;
    //反向平移和旋转,把线段中心点转到屏幕中心点的进行操作
    //1. 先进行平移
    vec2 translate = centerPos;
    tempUv -= translate;

    //2. 先旋转,因为此时中心点处于(0,0)点,旋转矩阵可以直接生效
    vec2 toCenter = centerPos - tPos;
    float radian = atan(toCenter.y,toCenter.x);
    float degree =  radian * 180.0/PI;

    //反向旋转到0度
    tempUv *= rotate2d(-1 * radian );
    
    
    vec2 uv = abs(tempUv);  //   左右上下都是正刻度  [-1,0],[0,1] => [1,0],[0,1]
    //对线段上的点取距离场
    uv.x -= len*0.5;  //即:线段内的x应该是小于等于0的,线段外的是大于0的 [1,0],[0,-0.5len][-0.5len,0],[0,1]
    float d0 = length(uv);  // 此时uv的坐标分别以两个端点为原点的坐标,所以距离就是距离端点的距离
    //d的值在[0,radius]之间取值
    float d = uv.x > 0.0 ? d0 : uv.y;  //如果uv.x > 0 说明处于端点的半圆内,小于0则说明是除了半圆剩下的长方形内

    float radius = newLineWidth;  //距离场半径
    float pixelRadius = resolution.y * radius;
    float boarder = 20.0 / pixelRadius;  //2个像素来模糊边缘
    //光滑边缘
    float value = smoothstep(radius, radius + radius*boarder,d);
    float pct = 1.0 - value;

    color += vec4(pct,pct,pct,1.0);
    gl_FragColor = color;
}


