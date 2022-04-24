import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Observable, throwError, catchError, retry, pipe } from 'rxjs';

type PixelRequest = {
  corner_points: string,
  dimensions: [number, number]
}

@Component({
  selector: 'app-pixel-image',
  templateUrl: './pixel-image.component.html',
  styleUrls: ['./pixel-image.component.css']
})

@Injectable()
export class PixelImageComponent implements OnInit {

  pixelImageForm = this.formBuilder.group({
    height: '',
    width: '',
    corners: ''
  })
  result = Object();

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  onSubmit(): void {
    let reqBody = this.constructPixelRequest();
    console.log(reqBody);
    this.http.post<Object>("http://localhost:3000", reqBody)
      .subscribe((data: Object) => this.result = data);
  }

  constructPixelRequest(): PixelRequest {
    return {
      corner_points: JSON.parse(this.pixelImageForm.get('corners')!.value),
      dimensions: [this.pixelImageForm.get('height')!.value as number,
                  this.pixelImageForm.get('width')!.value as number]
    }
  }

  ngOnInit(): void {
  }

  hasResult(): boolean {
    return Object.keys(this.result).length > 0;
  }

  stringify(row: any): string {
    return JSON.stringify(row);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

}
