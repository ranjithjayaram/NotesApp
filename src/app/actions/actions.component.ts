import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(private notesService:NotesService) { }
  public Notes:any=[];
  public currentNote:any={};
  ngOnInit(): void {
    this.Notes=localStorage.getItem('Notes');
  }
  createNewNote(){
    if(this.currentNote.content){
      this.saveNote();
    }else{
      this.deleteNote();
    }
    this.currentNote={};
   // this.currentNote.id= this.createRandomId();
    this.notesService.createNewNote(this.currentNote);
  }
  saveNote(){
    this.notesService.saveNote(this.currentNote);
  }
  
  editNote(){
    console.log(this.currentNote);
  }
  deleteNote(){
    this.notesService.removeNote();
  }
}
