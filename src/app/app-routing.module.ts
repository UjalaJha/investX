import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-investment/:investment_name',
    loadChildren: () => import('./add-investment/add-investment.module').then( m => m.AddInvestmentPageModule)
  },
  {
    path: 'view-investment/:investment_name',
    loadChildren: () => import('./view-investment/view-investment.module').then( m => m.ViewInvestmentPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
