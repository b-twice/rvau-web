import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FormQuestionComponent }   from './form-question/form-question.component';
import { ValidationMessagesPipe } from './form-question/form-question.pipe';
import { FormComponent } from './form.component';
import { QuestionControlService } from './question-control.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormQuestionComponent,
        FormComponent,
        ValidationMessagesPipe
    ],
    exports: [
        FormComponent
    ],
    providers: [
        QuestionControlService
    ]
})
export class DynamicFormModule { }
