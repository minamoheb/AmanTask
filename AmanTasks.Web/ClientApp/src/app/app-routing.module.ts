import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/layout/home/home.component';
import { MainComponent } from './components/layout/main/main.component';

const routes: Routes = [




  //{ path: '', component: HomeComponent },
  { path: '', component: MainComponent, pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'masterfiles',
        loadChildren: () => import('./components/pages/masterfiles/masterfile.module').then((m) => m.MasterfileModule),
      }
   
    
 
   
    ],
  },

  


]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
