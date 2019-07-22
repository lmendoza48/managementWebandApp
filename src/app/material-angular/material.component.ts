import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule,
         MatCheckboxModule, 
         MatButtonModule,
         MatInputModule, 
         MatSidenavModule, 
         MatIconModule, 
         MatListModule,
         MatDatepickerModule,
         MatNativeDateModule,
         MatDialogModule,
         MatSelectModule,
         MatGridListModule,
         MatMenuModule,
         MatCardModule,
         MatBadgeModule,
         MatTabsModule
        }
 from '@angular/material';

@NgModule({
  imports: [MatButtonModule, 
            MatCheckboxModule,
            MatExpansionModule,
            MatFormFieldModule,
            MatInputModule,
            MatToolbarModule,
            MatSidenavModule,
            MatIconModule,
            MatListModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatDialogModule,
            MatSelectModule,
            MatGridListModule,
            MatMenuModule,
            MatCardModule,
            MatBadgeModule,
            LayoutModule,
            MatTabsModule,
            MatSnackBarModule
          ],
 exports: [MatButtonModule, 
           MatCheckboxModule,
           MatExpansionModule,
           MatFormFieldModule, 
           MatInputModule,
           MatToolbarModule,
           MatSidenavModule,
           MatIconModule,
           MatListModule,
           MatDatepickerModule,
           MatNativeDateModule,
           MatDialogModule,
           MatSelectModule,
           MatGridListModule,
           MatMenuModule,
           MatCardModule,
           MatBadgeModule,
           LayoutModule,
           MatTabsModule,
           MatSnackBarModule
          ],
})
export class MaterialComponent { }