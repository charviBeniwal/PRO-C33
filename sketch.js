const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var divisions = [];
var plinkos = [];

var divisionHeight=300;
var score =0;
var particle;
var turn = 0;
gameState = "start";


function setup() {
  
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  
  for (var k = 0; k <=width; k = k + 80){
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for (var j = 75; j <=width; j=j+50){
     plinkos.push(new Plinko(j,75));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,175));
  }

  for (var j = 75; j <=width; j=j+50){
    plinkos.push(new Plinko(j,275));
  }

  for (var j = 50; j <=width-10; j=j+50){
    plinkos.push(new Plinko(j,375));
  }

}
 

function draw() {
  background("black");
  Engine.update(engine);

  textSize(20)
  text("Score : "+score,20,30);
  
  //bucket value
  
  for (var k = 0; k <=265; k = k + 87){
    text("500", k, 510);
  }
  
  for (var k = 352; k <=600; k = k + 83){
    text("100", k, 510);
  }
  
  for (var k = 598; k <=width; k = k + 83){
    text("200", k, 510);
  }

  //display
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
   
  /*for (var j = 0; j < particles.length; j++) {
   particles[j].display();
  }
  if(frameCount%60===0 && keyCode === 32){
    particles.push(new Particle(random(width/2-30, width/2+30), 10,10));
    turn++;
    console.log(turn);
  }*/

  if(particle!=null){
    
    particle.display();

      if(particle.body.position.y > 500){
          
        if(particle.body.position.x < 320){
            score = score + 500;
            particle = null;
            
            if(turn>=5)gameState="end";
          }

        else if(particle.body.position.x > 320 && particle.body.position.x < 560){
            score = score + 100;
            particle = null;
            
            if(turn>=5)gameState="end";
          }

        else if(particle.body.position.x > 560  ){
            score = score + 200;
            particle = null;
            
            if(turn>=5)gameState="end";
          }
      }
  }

}

function mousePressed(){
  if(gameState!=="end"){
    turn++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}
