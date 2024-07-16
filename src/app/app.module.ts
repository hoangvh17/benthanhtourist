import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http' 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

import { AdminComponent } from './components/admin/admin.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { Authguard } from './auth/auth-guard';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { Adminguard } from './auth/admin-guard';
import { UserListComponent } from './components/user-list/user-list.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'products', component: ProductsComponent},

  { path: 'category-list', component: CategoryListComponent, canActivate: [Adminguard] },
  { path: 'category-add', component: CategoryAddComponent, canActivate: [Adminguard] },
  { path: 'category-edit/:id', component: CategoryEditComponent, canActivate: [Adminguard] },
  { path: 'product-list', component: ProductListComponent, canActivate: [Adminguard] },
  { path: 'product-add', component: ProductAddComponent, canActivate: [Adminguard] },
  { path: 'product-edit/:id', component: ProductEditComponent, canActivate: [Adminguard] },
  { path: 'statistic', component: StatisticComponent, canActivate: [Adminguard] },
  { path: 'myaccount', component: MyAccountComponent, canActivate: [Authguard] },
  { path: 'user-list', component: UserListComponent, canActivate: [Adminguard] },



  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,

    ProductDetailComponent,
    ProductsComponent,

    AdminComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    StatisticComponent,
    UserListComponent,


    MyAccountComponent,

   ],
  imports: [
    BrowserModule,

    FormsModule,
    ReactiveFormsModule,

    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
