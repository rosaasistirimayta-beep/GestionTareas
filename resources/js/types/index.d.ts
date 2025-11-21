import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


// ---------------Desde Este Punto se realizo tod -------------------
// Este es de la paginacion de 10
export interface PageLinkItem {
    active: boolean; // true si es la página actual
    label: string;   // el texto que se mostrará (puede contener HTML, ej: «&laquo;»)
    url: string;     // URL de la página; null si no se puede ir
}
export interface Usuario {
    id: number;
    name: string;
}

export interface Todo {
    id: number;
    user_id: number;
    name: string;
    status: 'creado' | 'en-proceso' | 'finalizado';
    usuarioQueCreoLaTarea?: Usuario | null;
}
