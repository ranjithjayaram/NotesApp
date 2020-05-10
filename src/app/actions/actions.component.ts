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
  public selectedNote:any;
  ngOnInit(): void {
    this.Notes=localStorage.getItem('Notes');
    this.notesService.selectedNoteObject.subscribe(note=>{
      this.selectedNote=note;
    })
  }
  createNewNote(){
    if(this.currentNote.content){
      this.currentNote.timeUpdated= new Date();
      this.notesService.saveNote(this.currentNote);
    }else{
      this.notesService.removeNote(this.currentNote);
    }
    this.currentNote={};
    this.notesService.createNewNote(this.currentNote);
  }
  saveNote(){
    this.snackbar.open('Note Saved', 'close', {
      duration: 2000,
      verticalPosition: 'top',
      panelClass:'custom-class-save'
    });
    this.currentNote.timeUpdated= new Date();
    this.notesService.saveNote(this.currentNote);
  }
  
  deleteNote(){
    if(this.selectedNote){
      this.snackbar.open('Note Removed', 'close', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass:'custom-class-delete'
      });
      this.notesService.removeNote(this.selectedNote);
    }
    else{
      this.snackbar.open('No note selected', 'close', {
        duration: 2000,
        verticalPosition: 'top',
        panelClass:'custom-class-warning'
      });
    }
  }
  toggle(){
    this.notesService.toggleService();
  }
  searchText(event){
    this.notesService.search(event.target.value)
  }
}
