import { Component,OnInit} from '@angular/core';
import { MapService } from 'src/app/shared/map.service';
import { ThrowStmt } from '@angular/compiler';
import { JsonPipe } from '@angular/common';
declare const google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  {
  public testcoords: Array<any>=[{lat: 33.735193559248955, lng: -112.21512971328124},{lat: 33.735193559248955, lng: -112.21512971328124}]
  // public testcoords: Array<any>=[1,2,3];
  constructor(public service:MapService) { }
  
  
  
  // parentMessage = "message from parent"
  ngOnInit() {
    this.service.changeMessage(this.testcoords);
    
  }
  newMessage() {
    
    
  }
  
  center: any = {
    lat: 33.5362475,
    lng: -111.9267386
  };

  onMapReady(map) {
    this.initDrawingManager(map);
  }

  initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon"]
      },
      
      polygonOptions: {
        draggable: true,
        editable: true
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    
    drawingManager.setMap(map);
    
    
     google.maps.event.addListener(drawingManager, 'polygoncomplete', function (polygon) {
      const len = polygon.getPath().getLength();
      const polyArrayLatLng = [];
      

      for (let i = 0; i < len; i++) {
        const vertex = polygon.getPath().getAt(i);
        const vertexLatLng = {lat: vertex.lat(), lng: vertex.lng()};
        polyArrayLatLng.push(vertexLatLng);
      }
      // the last point of polygon should be always the same as the first point (math rule)
      polyArrayLatLng.push(polyArrayLatLng[0]);
      

      let jdon = JSON.stringify(polyArrayLatLng);
      alert(jdon);


      
      
       
     

       console.log('coordinates', polyArrayLatLng);
       

       
       

      
       return polyArrayLatLng; 


    
  });
  
  
  
  
    
  
  
  

  }
  
  


}