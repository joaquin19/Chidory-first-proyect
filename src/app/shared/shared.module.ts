import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules Primeng
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeModule } from 'primeng/tree';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { PickListModule } from 'primeng/picklist';
import { DividerModule } from 'primeng/divider';
import { KeyFilterModule } from 'primeng/keyfilter';
import { StepsModule } from 'primeng/steps';

// Modules Primeng
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

// Components
import { TableListComponent } from './components/table-list/table-list.component';
import { AuthorizationsComponent } from './components/authorizations/authorizations.component';
import { TableListSimpleComponent } from './components/table-list-simple/table-list-simple.component';
import { AuditTrailFormComponent } from './components/audit-trail-form/audit-trail-form.component';

@NgModule({
  declarations: [
    TableListComponent,
    AuthorizationsComponent,
    TableListSimpleComponent,
    AuditTrailFormComponent
  ],
  imports: [
    CommonModule,
    RatingModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ConfirmDialogModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    InputNumberModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    CardModule,
    SelectButtonModule,
    InputTextareaModule,
    ToolbarModule,
    TreeModule,
    DynamicDialogModule,
    FieldsetModule,
    CheckboxModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    CarouselModule,
    PickListModule,
    DividerModule,
    KeyFilterModule,
    StepsModule
  ],
  exports: [
    FormsModule,
    AccordionModule,
    ReactiveFormsModule,
    TableModule,
    RatingModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    ProgressBarModule,
    DropdownModule,
    ToolbarModule,
    InputSwitchModule,
    SelectButtonModule,
    InputTextareaModule,
    InputTextModule,
    RadioButtonModule,
    CardModule,
    FileUploadModule,
    InputNumberModule,
    ConfirmDialogModule,
    TreeModule,
    DynamicDialogModule,
    FieldsetModule,
    CheckboxModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    CarouselModule,
    DividerModule,
    KeyFilterModule,
    StepsModule,
    TableListComponent,
    AuthorizationsComponent,
    TableListSimpleComponent,
    PickListModule,
    AuditTrailFormComponent
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ]
})
export class SharedModule { }
