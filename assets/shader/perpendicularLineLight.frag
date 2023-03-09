#ifdef GL_ES
varying lowp vec2 v_texCoord;
varying mediump vec2 v_position;
#else
varying vec2 v_texCoord;
varying vec2 v_position;
#endif

#define PI 3.1415926
uniform float lineWidth;
uniform float lightWidth;

uniform vec2 resolution;
uniform int size;

uniform float opcity;

uniform vec2 pos1;
uniform vec2 pos2;
uniform vec2 pos3;
uniform vec2 pos4;
uniform vec2 pos5;
uniform vec2 pos6;
uniform vec2 pos7;
uniform vec2 pos8;
uniform vec2 pos9;
uniform vec2 pos10;
uniform vec2 pos11;
uniform vec2 pos12;
uniform vec2 pos13;
uniform vec2 pos14;
uniform vec2 pos15;
uniform vec2 pos16;
uniform vec2 pos17;
uniform vec2 pos18;
uniform vec2 pos19;
uniform vec2 pos20;
uniform vec2 pos21;
uniform vec2 pos22;
uniform vec2 pos23;
uniform vec2 pos24;
uniform vec2 pos25;
uniform vec2 pos26;
uniform vec2 pos27;
uniform vec2 pos28;
uniform vec2 pos29;
uniform vec2 pos30;
uniform vec2 pos31;
uniform vec2 pos32;
uniform vec2 pos33;
uniform vec2 pos34;
uniform vec2 pos35;
uniform vec2 pos36;
uniform vec2 pos37;
uniform vec2 pos38;
uniform vec2 pos39;
uniform vec2 pos40;


//参数为弧度
mat2 rotate2d(float angle){
    return mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle));
}
void main()
{   
    vec2 posList[40]; 

    for(int i = 0;i < size;i++)
    {
        if(i == 0)
        {
            posList[i] = pos1;
        }else if(i == 1)
        {
            posList[i] = pos2;
        }else if(i == 2)
        {
            posList[i] = pos3;
        }else if(i == 3)
        {
            posList[i] = pos4;
        }else if(i == 4)
        {
            posList[i] = pos5;
        }else if(i == 5)
        {
            posList[i] = pos6;
        }else if(i == 6)
        {
            posList[i] = pos7;
        }else if(i == 7)
        {
            posList[i] = pos8;
        }else if(i == 8)
        {
            posList[i] = pos9;
        }else if(i == 9)
        {
            posList[i] = pos10;
        }else if(i == 10)
        {
            posList[i] = pos11;
        }else if(i == 11)
        {
            posList[i] = pos12;
        }else if(i == 12)
        {
            posList[i] = pos13;
        }else if(i == 13)
        {
            posList[i] = pos14;
        }else if(i == 14)
        {
            posList[i] = pos15;
        }else if(i == 15)
        {
            posList[i] = pos16;
        }else if(i == 16)
        {
            posList[i] = pos17;
        }else if(i == 17)
        {
            posList[i] = pos18;
        }else if(i == 18)
        {
            posList[i] = pos19;
        }else if(i == 19)
        {
            posList[i] = pos20;
        }
        else if(i == 20)
        {
            posList[i] = pos21;
        }else if(i == 21)
        {
            posList[i] = pos22;
        }else if(i == 22)
        {
            posList[i] = pos23;
        }else if(i == 23)
        {
            posList[i] = pos24;
        }else if(i == 24)
        {
            posList[i] = pos25;
        }else if(i == 25)
        {
            posList[i] = pos26;
        }else if(i == 26)
        {
            posList[i] = pos27;
        }else if(i == 27)
        {
            posList[i] = pos28;
        }else if(i == 28)
        {
            posList[i] = pos29;
        }else if(i == 29)
        {
            posList[i] = pos30;
        }else if(i == 30)
        {
            posList[i] = pos31;
        }else if(i == 31)
        {
            posList[i] = pos32;
        }else if(i == 32)
        {
            posList[i] = pos33;
        }else if(i == 33)
        {
            posList[i] = pos34;
        }else if(i == 34)
        {
            posList[i] = pos35;
        }else if(i == 35)
        {
            posList[i] = pos36;
        }else if(i == 36)
        {
            posList[i] = pos37;
        }else if(i == 37)
        {
            posList[i] = pos38;
        }else if(i == 38)
        {
            posList[i] = pos39;
        }else if(i == 39)
        {
            posList[i] = pos40;
        }

    }
    //将坐标系转换到[-1,1]
    vec2 texCoord = -1. + 2. * v_texCoord;  //[-1,1]

    //修正x方向坐标位置
    float factor = resolution.x/resolution.y;
    texCoord.x *= factor;  

    float newLineWidth = lineWidth / resolution.y;
    float newLightWidth = lightWidth / resolution.y;
    vec4 color = vec4(0.0,0.0,0.0,0.0);

    //将坐标转换到[0,1]
    bool preCircle = false;
    float totalPct1 = 0.0;
    float maxFact1 = 0.0;
    float maxFact = 0.0;
    vec2 preTargetPos = vec2(-1.0,-1.0);
    for(int i = 0;i < size-1;i=i+2)
    {

        vec2 sPos = posList[i];
        vec2 tPos = posList[i+1];

        //如果新开一条线的话
        vec2 tempDiff = sPos - preTargetPos;
        if(tempDiff.x !=0.0 && tempDiff.y !=0.0)
        {
            //每一条线之间的透明度叠加 需要走 1-
            totalPct1 += (1-totalPct1) * maxFact1;
            maxFact1 = 0.0;
            preCircle = false;

        }
        preTargetPos = tPos;

        sPos /= resolution;
        //将坐标系转换到[-1,1]
        sPos = -1. + 2. * sPos;  //[-1,1]
        sPos.x *= factor;


        tPos /= resolution;
        //将坐标系转换到[-1,1]
        tPos = -1. + 2. * tPos;  //[-1,1]
        tPos.x *= factor;


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
        tempUv *= rotate2d(-1.0 * radian );
        
        vec2 uv1 = abs(tempUv);  //   左右上下都是正刻度  [-1,0],[0,1] => [1,0],[0,1]
        float newLen = len;
        //对线段上的点取距离场
        uv1.x -= newLen*0.5;  //即:线段内的x应该是小于等于0的,线段外的是大于0的 [1,0],( [0,-0.5len] [-0.5len,0] ),[0,1]

        float d01 = length(uv1);  // 此时uv的坐标分别以两个端点为原点的坐标,所以距离就是距离端点的距离
        //距离终点的距离
        
        float d1 = uv1.x > 0.0 ? d01 : uv1.y;  //如果uv.x > 0 说明处于端点的半圆内,小于0则说明是除了半圆剩下的长方形内

        //绘制边缘高光
        float radius1 = newLightWidth;  //距离场半径
        float pixelRadius1 = resolution.y * radius1;
        float boarder1 = 10.0;
        //如果变量d的值在如果在[radius1-(radius1*boarder1),radius1+(radius1*boarder1)]之间,则返回插值后的值(范围[0,1])
        //为了使小于radius-(radius1*boarder1)的值为0,大于为1,所以这里需要1-value
        float value1 = smoothstep(newLineWidth, radius1,d1);
        float pct1 = 1.0 - value1;
        if(uv1.x > 0.0)
        {
            maxFact1 = max(pct1,maxFact1);
            if(pct1 > 0.0)
                preCircle = true;
        }else{
            if(! preCircle){
                // 叠加的部分  使用 src + (1 - src)
                maxFact1 += (1.0 - maxFact1) * pct1;
            }else
            { 
                maxFact1 = max(pct1,maxFact1);
            }
            preCircle = false;
        }
        
        vec2 uv = abs(tempUv);  //   左右上下都是正刻度  [-1,0],[0,1] => [1,0],[0,1]
        //对线段上的点取距离场
        uv.x -= len*0.5;  //即:线段内的x应该是小于等于0的,线段外的是大于0的 [1,0],( [0,-0.5len] [-0.5len,0] ),[0,1]


        float d0 = length(uv);  // 此时uv的坐标分别以两个端点为原点的坐标,所以距离就是距离端点的距离
        //距离终点的距离
        

        float d = uv.x > 0.0 ? d0 : uv.y;  //如果uv.x > 0 说明处于端点的半圆内,小于0则说明是除了半圆剩下的长方形内
        float radius = newLineWidth;  //距离场半径
        float pixelRadius = resolution.y * radius;
        float boarder = 10.0 / pixelRadius;  //2个像素来模糊边缘
        //如果变量d的值在如果在[radius-(radius*boarder),radius+(radius*boarder)]之间,则返回插值后的值(范围[0,1])
        //为了使小于radius-(radius*boarder)的值为0,大于为1,所以这里需要1-value
        float value = smoothstep(radius-(radius*boarder), radius+(radius*boarder),d);
        float pct = 1.0 - value;
        if(pct > maxFact)
        {
            maxFact = pct;
        }
        
    }

    totalPct1 += (1-totalPct1) * maxFact1;
    color += vec4(totalPct1 ,0.9 * totalPct1,totalPct1,totalPct1);
    color += vec4(maxFact,maxFact,maxFact,maxFact);

    color *= opcity;

    gl_FragColor = color;
}