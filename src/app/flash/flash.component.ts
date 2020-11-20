import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { IFlash } from '../flash.model'

@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlashComponent implements OnInit {

  @Input() flash: IFlash = {
    id: 1,
    question: 'React to Angular',
    answer: ' No reaction :)',
    show: false
  }

  @Output() onToggleCard = new  EventEmitter()

  @Output() onDelete = new  EventEmitter()
  @Output() onEdit = new  EventEmitter()
  @Output() onRemenberChange = new  EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  toggleCard(){
    this.onToggleCard.emit(this.flash.id)
  }

  deleteFlash(){
    this.onDelete.emit(this.flash.id)
  }

  editFlash(){
    this.onEdit.emit(this.flash.id)
  }

  markCorrect(){
    this.onRemenberChange.emit({
      id: this.flash.id,
      flag: 'correct'
    })
  }

  markIncorrect(){
    this.onRemenberChange.emit({
      id: this.flash.id,
      flag: 'incorrect'
    })
  }

}
