import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  public toggleStatus:boolean=true;
  public currentTime;
  constructor(private notesService:NotesService,private cdr: ChangeDetectorRef ) { }
  
  ngOnInit(): void {
    this.Notes=this.notesService.getAllNotes();
    this.notesService.Notes.subscribe(note=>{
      if(this.Notes==null){
        this.Notes=[];
      }
      this.Notes = note;
      this.notesService.selectedNoteObject.subscribe(note=>{
        this.SelectedNote=note;
        this.cdr.markForCheck();
      })
    })
    this.notesService.currentNote.subscribe(note=>{
      this.currentNote= note;
    })
    this.notesService.toggleobj.subscribe(toggle=>{
      this.toggleStatus= toggle;
    })
    this.currentTime=new Date();
    setInterval(()=> {
      this.currentTime=new Date()},30000); 

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
