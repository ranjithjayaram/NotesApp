import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  public currentNote:any={};
  public Notes=[];
  public SelectedNote:any={}
  constructor(private notesService:NotesService ) { }
  
  ngOnInit(): void {
    this.Notes=this.notesService.getAllNotes();
    this.notesService.Notes.subscribe(note=>{
      if(this.Notes==null){
        this.Notes=[];
      }
      this.Notes = note.reverse();
      
    })
    this.notesService.currentNote.subscribe(note=>{
      this.currentNote= note;
    })
  }
  startNewNote(){
    this.currentNote={};
  }
  saveContent(){
    this.notesService.saveNote(this.currentNote);
    this.currentNote={};

  }
  selectCurrentNote(note){
    this.SelectedNote=note;
    this.currentNote= note;
    this.notesService.setSelectedNote(note);
  }
 

}
