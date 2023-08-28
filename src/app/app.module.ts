import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductPostComponent } from './shared/product-post/product-post.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environment/environment';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { ProductsViewComponent } from './shared/products-view/products-view.component';
import { ProductViewComponent } from './shared/product-view/product-view.component';
import { AddManufactureCategoryComponent } from './shared/add-manufacture-category/add-manufacture-category.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HomeComponent } from './common/home/home.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { PhotoCarouselComponent } from './shared/photo-carousel/photo-carousel.component';
import { AdminDashboardComponent } from './common/admin-dashboard/admin-dashboard.component';
import { StartupComponent } from './shared/startup/startup.component';
import { ThemeToggleComponent } from './support/theme-toggle/theme-toggle.component';
import { TermsConditionComponent } from './common/terms-condition/terms-condition.component';
import { CategoryshoppingComponent } from './common/categoryshopping/categoryshopping.component';
import { ProductCardsComponent } from './support/product-cards/product-cards.component';
import { CatergoryComponent } from './support/catergory/catergory.component';
import { WorkTermsComponent } from './support/work-terms/work-terms.component';
import { AboutusComponent } from './common/aboutus/aboutus.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { FootersComponent } from './common/footers/footers.component';
import { TrackingComponent } from './common/tracking/tracking.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductPostComponent,
    DashboardComponent,
    ProductsViewComponent,
    ProductViewComponent,
    AddManufactureCategoryComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    SidenavComponent,
    PhotoCarouselComponent,
    AdminDashboardComponent,
    StartupComponent,
    ThemeToggleComponent,
    TermsConditionComponent,
    CategoryshoppingComponent,
    ProductCardsComponent,
    CatergoryComponent,
    WorkTermsComponent,
    AboutusComponent,
    ContactusComponent,
    FootersComponent,
    TrackingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
