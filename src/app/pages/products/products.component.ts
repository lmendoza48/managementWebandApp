import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogNewProductsComponent } from './dialog-new-products/dialog-new-products.component';
import { Products } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';
import { Orders } from 'src/app/models/orders';
import { ProductsBuy } from 'src/app/models/products-buy';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  webListProducts :  Products[];
  dialogRef : MatDialogRef<DialogNewProductsComponent>;
  datafilterProdcts : string;
  ordsProduc : Orders[];
  datafilterOrds : string;


  constructor(public service : ProductsService, 
              public dialog : MatDialog) { }

  ngOnInit() {
      let dd = this.service.getConectListAppProducts();
      dd.snapshotChanges().subscribe(item => {
          this.webListProducts = [];
          item.forEach( element =>{
              let y = element.payload.toJSON();
              y["$key"] = element.key;
              this.webListProducts.push(y as Products);
          });
      });

      // ordenes view
      this.service.read_OrderDeatils().subscribe(data => {
        this.ordsProduc = [];
        let dats = data.map(e => {
          return {
            $key: e.payload.doc.id,
            name: e.payload.doc.data()['namePerson'] as string,
            dni: e.payload.doc.data()['dni'] as string,
            address: e.payload.doc.data()['address'] as string,
            email: e.payload.doc.data()['email'] as string,
            order: e.payload.doc.data()['order'] as number,
            productsData: JSON.parse(e.payload.doc.data()['totalOrd']),
            totalPay: e.payload.doc.data()['totalBuy'] as number,
            status: e.payload.doc.data()['status'] as string,
            date : e.payload.doc.data()['date'] as number,
          };
        })
        dats.forEach( od => {
            this.ordsProduc.push(od as unknown as Orders);
        });
        console.log('info. ', this.ordsProduc);
      });
  }
   
  openDialogNew(){
    this.dialogRef = this.dialog.open(DialogNewProductsComponent,{
      width: '800px',
      height: '35rem',
      data : this.service.dataProducts
    });
    this.dialogRef.afterClosed().subscribe(result => {
           this.service.dataProducts = new Products();
    });
  }
  
  updateDataDialog(item : Products){
       this.service.dataProducts = Object.assign({}, item);
       this.openDialogNew();
  }

  onDeleteData( item : Products){
    if(confirm('¿Estas seguro de Eliminar este Dato?') == true){
         this.service.deleteDataProducts(item.$key);
    }
  }
  
  /**** Order Status */
  updateStatusOrdrs(ords: Orders){
      ords.status = 'closed';
      this.service.update_OrderDeatils(ords.$key, ords);
  }
}
