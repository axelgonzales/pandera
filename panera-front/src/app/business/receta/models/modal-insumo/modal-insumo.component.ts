import { Component, OnInit, ViewChild } from '@angular/core';
import { InsumoResponse } from 'src/app/business/almacen/insumo/insumo/models/insumo.response';
import { InsumoService } from 'src/app/business/almacen/insumo/insumo/insumo.service';
import { PaneraVistaUtils } from 'src/app/commons/util/panera-vista-util';
import { InsumoRequest } from 'src/app/business/almacen/insumo/insumo/models/insumo.request';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RecetaDetalleResponse } from '../receta-detalle.response';
import { TipoCategoriaRequest } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.request';
import { CategoriaRequest } from 'src/app/business/administracion/categoria/models/categoria.request';
import { AdministracionCategoriaService } from 'src/app/business/administracion/categoria/administracion-categoria.service';
import { AdministracionTipoCategoriaService } from 'src/app/business/administracion/tipocategoria/administracion-tipocategoria.service';
import { TipoCategoriaResponse } from 'src/app/business/administracion/tipocategoria/models/tipocategoria.response';
import { RecetaResponse } from '../receta.response';
import { CategoriaResponse } from 'src/app/business/administracion/categoria/models/categoria.response';
import { MatTableDataSource } from '@angular/material/table';
import { IntermedioResponse } from 'src/app/business/almacen/intermedio/intermedio/models/intermedio.response';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-modal-insumo',
  templateUrl: './modal-insumo.component.html',
  styleUrls: ['./modal-insumo.component.scss'],
  providers: [
    InsumoService,
    AdministracionCategoriaService,
    AdministracionTipoCategoriaService,
  ]
})
export class ModalInsumoComponent implements OnInit {
  public insumos: InsumoResponse[];
  public idTipoCategoria = 0;
  public idCategoria = 0;
  public ingredientes: RecetaDetalleResponse[];
  public tipoCategorias: TipoCategoriaResponse[];
  public tipoCategoriasInsumo: TipoCategoriaResponse[];
  public receta: RecetaResponse;
  public categorias: CategoriaResponse[];
  selection = new SelectionModel<InsumoResponse>(true, []);

  displayedColumns: string[] = ['select', 'id', 'nombre'];
  dataSource = new MatTableDataSource<InsumoResponse>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private insumoService: InsumoService,
    public activeModal: NgbActiveModal,
    private categoriaService: AdministracionCategoriaService,
    private tipoCategoriaService: AdministracionTipoCategoriaService
  ) { 
    this.insumos = [];
    this.listarTipoCategoriasInsumo();
    this.listarTipoCategorias();
    this.ingredientes = [];
  }

  ngOnInit() {
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: InsumoResponse): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  listarTipoCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const tipoCategoriaRequest = new TipoCategoriaRequest();
    tipoCategoriaRequest.tipo = 'P';
    tipoCategoriaRequest.nombre = '';
    this.tipoCategoriaService.listarTipoCategorias(tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategorias = data.result;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }
  listarInsumos() {
    PaneraVistaUtils.mostrarLoading(true);
    const insumoRequest = new InsumoRequest();
    insumoRequest.idCategoria = this.idCategoria;
    insumoRequest.nombre = '';
    this.insumoService.listarInsumos(insumoRequest).subscribe(
      data => {
        if (data.success) {
          this.insumos = data.result;
          // this.insumos.forEach(insumo => {
          //   insumo.activo = '0';
          // });
          console.log(this.insumos);
          this.dataSource = new MatTableDataSource<InsumoResponse>(this.insumos);
          this.dataSource.paginator = this.paginator;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }
  guardarInsumo() {
    this.selection.selected.forEach(insumo => {
      let noExisteinsumo = true;
      this.ingredientes.forEach(ingrediente => {
        if (ingrediente.idInsumo === insumo.id) {
          noExisteinsumo = false;
        }
      });
      if (noExisteinsumo) {
        const ingrediente = new RecetaDetalleResponse();
        ingrediente.id = 0;
        ingrediente.idInsumo = insumo.id;
        ingrediente.nomInsumo = insumo.nombre;
        ingrediente.nomIngrediente = insumo.nombre;
        ingrediente.cantidad = 1;
        ingrediente.nomMedida = insumo.nomMedida;
        this.ingredientes.push(ingrediente);
      }
    });
    this.activeModal.close(this.ingredientes);  
  }
  listarTipoCategoriasInsumo() {
    PaneraVistaUtils.mostrarLoading(true);
    const tipoCategoriaRequest = new TipoCategoriaRequest();
    tipoCategoriaRequest.tipo = 'I';
    tipoCategoriaRequest.nombre = '';
    this.tipoCategoriaService.listarTipoCategorias(tipoCategoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.tipoCategoriasInsumo = data.result;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  listarCategoriasInsumo() {
    PaneraVistaUtils.mostrarLoading(true);
    const categoriaRequest = new CategoriaRequest();
    categoriaRequest.idTipo = this.idTipoCategoria;
    categoriaRequest.nombre = '';
    this.categoriaService.listarCategorias(categoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.categorias = data.result;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }

  cerrar(){
    this.activeModal.dismiss();
  }

  listarCategorias() {
    PaneraVistaUtils.mostrarLoading(true);
    const categoriaRequest = new CategoriaRequest();
    categoriaRequest.idTipo = this.receta.idTipoCategoria;
    categoriaRequest.nombre = '';
    this.categoriaService.listarCategorias(categoriaRequest).subscribe(
      data => {
        if (data.success) {
          this.categorias = data.result;
        } else {
          console.log(data.message);
        }
        PaneraVistaUtils.mostrarLoading(false);
      },
      err => {
        console.log(err);
        PaneraVistaUtils.mostrarLoading(false);
      }
    );
  }
  
}
