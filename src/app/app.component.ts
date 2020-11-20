import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FlashService } from './flash.service'
import { NgForm } from '@angular/forms'
import { Observable } from 'rxjs';
import { IFlash } from './flash.model';
function getRandomNumber() {
  return Math.floor(Math.random() * 1000)
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'flashcards';

  @ViewChild('flashForm', {static:true}) flashForm: NgForm

  flashs

  flash = {
    question: '',
    answer: ''
  }

  editing = false
  editingId: number
  flash$: Observable<IFlash[]>
  subscription
  constructor(private flashService: FlashService){
    this.flashs = this.flashService.flashs
  }

  ngOnInit(): void {
    this.flash$ = this.flashService.flashs$


  }



  trackByFlashId(index, flash){
    return flash.id
  }

  handleSubmit() : void{
    this.flashService.addFlash(this.flash)
    this.handleClear()
  }

  handleClear(){
    this.flash = {
      question: '',
      answer: ''
    }
    this.flashForm.reset()
  }

  handleToggleCard(id){
    this.flashService.toggleFlash(id)
  }

  handleDelete(id: number){
    this.flashService.deleteFlash(id)
  }

  handleEdit(id: number){
    this.flash = this.flashService.getFlash(id)
    this.editing = true
    this.editingId = id
  }

  handleUpdate(){
    this.flashService.updateFlash(this.editing, this.flash)
    this.handleCancel()
  }

  handleCancel(){
    this.editing = false
    this.editing = undefined
    this.handleClear()
  }

  handleRememberedChange({id, flag}){
    this.flashService.rememberedChange(id, flag)
  }

}
