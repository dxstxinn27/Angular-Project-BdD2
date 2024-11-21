import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ProductoI } from '../../../models/producto';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  public form!: FormGroup;

  productoService = inject(ProductoService);
  
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      stockmin: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      tipoproducto: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor complete el formulario correctamente', life: 5000 });
      return;
    }

    const formValue: ProductoI = this.form.value;
    console.log(formValue);
    this.productoService.createProducto(formValue).subscribe(
      () => {
        setTimeout(() => {
          this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Producto Creado', life: 5000 });
        }, 0);
        this.router.navigateByUrl('/productos');
      },
      (err: any) => {
        console.log(err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se ha podido crear el producto', life: 5000 });
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/productos');
  }

  get nombre() { return this.form.get('nombre'); }
  get marca() { return this.form.get('marca'); }
  get precio() { return this.form.get('precio'); }
  get stockmin() { return this.form.get('stockmin'); }
  get cantidad() { return this.form.get('cantidad'); }
  get tipoproducto() { return this.form.get('tipoproducto'); }
}
