import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarTopicoPage } from './editar-topico';

@NgModule({
  declarations: [
    EditarTopicoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarTopicoPage),
  ],
})
export class EditarTopicoPageModule {}
