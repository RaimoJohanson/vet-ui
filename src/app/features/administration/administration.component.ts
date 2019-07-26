import { Component } from '@angular/core';

interface SidemenuItem {
  label: string;
  icon?: string;
  link: string;
}

@Component({
  selector: 'app-administration',
  styleUrls: ['administration.styles.scss'],
  templateUrl: './administration.template.html',
})
export class AdministrationComponent {
  public sidemenu: SidemenuItem[] = [
    {
      label: 'Töölaud',
      icon: 'fa-tachometer-alt',
      link: '/admin/statistics',
    },
    {
      label: 'Sümptomid',
      icon: 'fa-question',
      link: '/admin/manage-features',
    },
    {
      label: 'Diagnoosid',
      icon: 'fa-stethoscope',
      link: '/admin/manage-decisions',
    },
    {
      label: 'Haigusjuhtumid',
      icon: 'fa-notes-medical',
      link: '/admin/instances',
    },
  ];
}
