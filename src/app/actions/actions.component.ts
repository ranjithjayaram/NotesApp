import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import {MatSnackBar } from '@angular/material/snack-bar'
@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {

  constructor(private notesService:NotesService, private snackbar:MatSnackBar) { }
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
    this.notesService.createNewNote(this.currentNote);
  }
  saveNote(){
    this.snackbar.open('Note Saved', '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass:'custom-class-save'
    });
    
    this.notesService.saveNote(this.currentNote);
  }
  
  deleteNote(){
    this.snackbar.open('Note Removed', '', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass:'custom-class-delete'
    });
    this.notesService.removeNote();
  }
  toggle(){
    this.notesService.toggleService();
  }
  search(searchtext){
    this.notesService.search(searchtext)
  }
}
