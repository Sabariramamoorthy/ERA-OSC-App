import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductPostComponent } from './shared/product-post/product-post.component';
import { ProductsViewComponent } from './shared/products-view/products-view.component';
import { ProductViewComponent } from './shared/product-view/product-view.component';
import { AddManufactureCategoryComponent } from './shared/add-manufacture-category/add-manufacture-category.component';
import { HomeComponent } from './common/home/home.component';
import { AdminDashboardComponent } from './common/admin-dashboard/admin-dashboard.component';
import { TermsConditionComponent } from './common/terms-condition/terms-condition.component';
import { CategoryshoppingComponent } from './common/categoryshopping/categoryshopping.component';
import { WorkTermsComponent } from './support/work-terms/work-terms.component';
import { FootersComponent } from './common/footers/footers.component';
import { AboutusComponent } from './common/aboutus/aboutus.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { TrackingComponent } from './common/tracking/tracking.component';

const routes: Routes = [
  {
    path: 'product-upload', component: ProductPostComponent
  },
  {
    path: 'product-Views/:tag', component: ProductsViewComponent
  },
  {
    path: 'product-View/:ProductId', component: ProductViewComponent
  },
  {
    path:'add-category',component:AddManufactureCategoryComponent
  }
  ,
  {
    path: 'admin-login', component: AdminDashboardComponent
  },

  {
    path: 'faq', component: TermsConditionComponent
  },

  {
    path: 'terms', component: WorkTermsComponent
  },

  {
    path: 'category/:tag', component: CategoryshoppingComponent
  },

  {
    path:'home',component:HomeComponent
  },
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full'
  },

  {
    path: 'footer', component: FootersComponent
  },

  {
    path: 'aboutus', component: AboutusComponent
  },

  {
    path:'contactus',component:ContactusComponent
  },
  {
    path:'tracking',component:TrackingComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
