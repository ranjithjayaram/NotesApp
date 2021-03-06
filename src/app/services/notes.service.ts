import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
public Notes = new Subject<any>();
public currentNote= new Subject<any>();
public NotesObject:Array<any>=[];
public selectedNote:any=[];
public selectedNoteObject= new Subject<any>();
private toggle:boolean=true;
public toggleobj= new Subject<boolean>();

//public Notes=[];
  constructor() {
    this.NotesObject=this.getAllNotes();
    this.getcurrentNote();
  }
  createNewNote(data){
    this.currentNote.next(data);
    this.saveNote(data);
    if(data.id == undefined){
      data.id= this.createRandomId();
    }
    this.setSelectedNote(data);
  }
  saveNote(data){
    if(data.id == undefined){
   if(this.NotesObject==null){
    this.NotesObject=[];
    }
    
    this.NotesObject.push(data);
    this.Notes.next(this.NotesObject);
  }
  else{
    this.NotesObject.map(notes=>{
      if(notes.id== data.id){
        notes.content= data.content;
        notes.timeUpdated= new Date();
      }
    })
  }
  localStorage.setItem('Notes', JSON.stringify(this.NotesObject));
}
getcurrentNote(){
  let l= this.NotesObject;
  if(l){
    let curObj= this.NotesObject[l.length];
    this.currentNote.next(curObj);
  }
}
getAllNotes(){
  let notes= JSON.parse(localStorage.getItem('Notes'));
  if(!notes) {
    notes=[];
  }
  else{
    notes.map(note=>{if(note.content){return note}});
  }
  return notes;
}
createRandomId(){
  let result='';
  let chars= '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 20; i > 0; --i) 
  result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

setSelectedNote(note){
  if(!note){
    note=[];
  }
  this.selectedNote=note;
  this.selectedNoteObject.next(note);
}
removeNote(note){ 
  if(this.NotesObject){
  this.NotesObject =this.NotesObject.filter(item => item.id != note.id);
  if(note.id ==this.selectedNote.id){
    this.setSelectedNote(this.NotesObject[0])
  }
  this.Notes.next(this.NotesObject);
  let data={};
  this.currentNote.next(data);
  localStorage.setItem('Notes', JSON.stringify(this.NotesObject));
  }
}

toggleService(){
  this.toggle= !this.toggle;
  this.toggleobj.next(this.toggle);
}
search(text){
//  let array= this.NotesObject.filter(note=> note.content.toLowerCase().indexOf(text) > -1);
  let array= this.NotesObject.filter(note=>{
    if(note.content){
      if(note.content.toLowerCase().indexOf(text) > -1){
        return note;
      }
    }
  });
  this.Notes.next(array);
}
}
