import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "./product.service";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {Category} from "../../core/models/interfaces/Category";
import {StorageService} from "../../core/store/StorageService.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public productForm: FormGroup = new FormGroup({});
  public image: string = "";
  public category_list: Category[] = [];
  private storageService: StorageService = inject(StorageService);
  private async_storage: any;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastController: ToastController,
    private router: Router,
  ) { }

  ngOnInit() {
     this.productService.getCategories().subscribe(
      async response  => {
        if(response.ok) {
          this.category_list = response.categories;
        }
      });
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  async ionViewWillEnter(){
    this.async_storage = await this.storageService.get('UserSession');
  }

  goBack() {
    this.router.navigate(['dashboard']);
  }

  onImageChange(event: any) {
    const file: any = event.target.files[0];
    if (file) {
      const MAX_SIZE: number = 10 * 1024 * 1024;
      if (file.size > MAX_SIZE) {
        this.toastController.create({
          message: 'The image size cannot be larger than 10 MB.',
          duration: 1500,
          position: 'top',
          color: 'danger'
        }).then(toast => toast.present());
        this.productForm.patchValue({ image: "" });
        this.image = "";
        return;
      }
      this.productForm.patchValue({ image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        this.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onProduct() {
    let toast: HTMLIonToastElement;
    if (this.productForm?.valid) {
      const formData: FormData = new FormData();
      const formValues: any = this.productForm.value;
      formData.append('name', formValues.name);
      formData.append('description', formValues.description);
      formData.append('category', formValues.category);
      formData.append('image', formValues.image);
      this.productService.postCreateProduct(formData, this.async_storage.access_token.toString()).subscribe(
        async response  => {
          if(response.ok) {
            toast = await this.toastController.create({
              message: response.message,
              duration: 1500,
              position: 'top',
              color: "success"
            });
            await toast.present()
            setTimeout(() => this.router.navigate(['dashboard']), 1500);
          }
        },
        async error => {
          let msg: any = "An error has occurred";
          if (error.status === 400)
            msg = error.error.message
          else if(error.status === 500)
            msg = error.error.message
          toast = await this.toastController.create({
            message: msg,
            duration: 1500,
            position: 'top',
            color: "danger"
          });
          await toast.present()
          this.productForm.reset();
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

}
