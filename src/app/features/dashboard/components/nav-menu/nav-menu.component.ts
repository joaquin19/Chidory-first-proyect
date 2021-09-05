import { Component, OnInit } from '@angular/core';

import { UserAuthenticationModel } from '@app/core/models/auth.model';
import { MenuService } from '../../pages/catalogs/services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public listMenu: any;
  public data: any;
  public currentUser: any;

  constructor(
    private menuService: MenuService,
  ) {
    this.listMenu = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.currentUser = UserAuthenticationModel.loadCache()?.user;
    this.getMenuByUser(this.currentUser.userName);
  }

  getMenuByUser(user): void {
    this.menuService.getMenuByUser(user).subscribe(
      data => {
        this.listMenu = data;
        this.setMenu();
      });
  }

  setMenu(): void {
    const listParents = this.listMenu.filter(o => o.parentMenuId === null);
    listParents.sort((a, b) => a[`sortOrder`] - b[`sortOrder`]);

    listParents.forEach(parent => {
      const nodeChildItems: any = [];
      const iconClass = 'pi';

      const listChildrens = this.listMenu.filter(o => o.parentMenuId === parent.menuId);
      listChildrens.sort((a, b) => a[`sortOrder`] - b[`sortOrder`]);

      listChildrens.forEach(children => {
        nodeChildItems.push({
          moduleName: `${children.menuDisplayName}`,
          icon: `${iconClass} ${children.iconName}`,
          path: children.pageURL
        });
      });

      let customClass: string = '';

      switch (parent.menuDisplayName) {
        case `Inicio`:
          customClass = `menu_home`;
          break;
        case `Catálogos`:
          customClass = `menu_catalogs`;
          break;
        case `Configuración`:
          customClass = `menu_settings`;
          break;
        case `Compras`:
          customClass = `menu_purchases`;
          break;
        case `Finanzas`:
          customClass = `menu_finance`;
          break;
        case `Ventas`:
          customClass = `menu_sales`;
          break;
        case `Facturación`:
          customClass = `menu_invoice`;
          break;
        case `Almacén`:
          customClass = `menu_inventory`;
          break;
        case `Reportes`:
          customClass = `menu_reports`;
          break;
      }

      this.data.push({
        moduleName: `${parent.menuDisplayName}`,
        icon: `${iconClass} ${parent.iconName}`,
        path: parent.pageURL,
        nodeChild: nodeChildItems,
        customClass
      });

    });
  }

}
