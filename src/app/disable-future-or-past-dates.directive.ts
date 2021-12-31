import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import * as moment from 'moment';

const SIMPLE_FORMAT_DATE = "YYYY-MM-DD";

const DATE_TIME_FORMAT_DATE = "YYYY-MM-DDTHH:mm";


@Directive({
  selector: '[appDisableFutureOrPastDates]'
})


export class DisableFutureOrPastDatesDirective {

  constructor(public elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.dateType = this.elementRef.nativeElement.getAttribute('type');  
    switch(this.dateType) {
      case "date":
        this.dateFormat = SIMPLE_FORMAT_DATE;
        break;
      case "datetime-local":
        this.dateFormat = DATE_TIME_FORMAT_DATE;
        break;
    }

    this.dateNow = moment(new Date()).format(this.dateFormat);

  }

  dateNow!: string ;

  _preValue?: any = "";

  finalDate!: any;

  dateType!: "date" | "datetime-local";

  dateFormat!: string;


  disableFuturDates: boolean = false;

  @Input("disableFuturDates")
  set setDisableFuturDates(disableFuturDates: any) {    
    this.disableFuturDates = disableFuturDates;
  }

  
  @Input()
  disablePastDates: boolean = false;




  public onChange = (_: any) => {};
  public onTouch = () => {};

  @HostListener("input", ["$event"])
  public onInput(e: any): void {    
   this.finalDate = e.target.value;

  }

  @HostListener("change", ["$event"])
  public onInputChange(e: any): void {
    this.finalDate = e.target.value;

  }

  @HostListener("blur", ["$event"])
  public onBlur(e: Event): void {
    if(!this.isDateValid(this.finalDate)) {      
      this.writeValue("");
    } else {
      this.writeValue(this.finalDate);
      
    } 
    
    
    this.onTouch();
  }


  public writeValue(value: string | number): void {     

    this.onChange(value);
    this.renderer2.setProperty(this.elementRef.nativeElement, "value", value);
  }

  public registerOnChange(fn: any): void {
    if(this.disableFuturDates)
    this.renderer2.setProperty(this.elementRef.nativeElement, "max", this.dateNow);
    else if(this.disablePastDates) this.renderer2.setProperty(this.elementRef.nativeElement, "min", this.dateNow);
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  isDateValid(date: any): boolean {

    if(this.disableFuturDates) {      
      return moment(date).isSameOrBefore(moment(new Date()).format(this.dateFormat));
    } else {
      return moment(date).isSameOrAfter(moment(new Date()).format(this.dateFormat));
    }
  }

}
