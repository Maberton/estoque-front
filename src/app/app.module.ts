import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { ProdutosComponent } from './components/produtos/produtos.component';
import { EstoqueComponent } from './components/estoque/estoque.component';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TextMaskModule } from 'angular2-text-mask';
import { EditarEstoqueComponent } from './components/dialogs/editar-estoque/editar-estoque.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDb } from './services/in-memory-db.service';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProdutosComponent,
    EstoqueComponent,
    EditarEstoqueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    CurrencyMaskModule
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDb, { delay: 500 }),
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'pt-BR' },
               {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
               {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
