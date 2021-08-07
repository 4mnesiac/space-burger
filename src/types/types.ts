import { Location } from 'history';

// **ingredients**
export type TingredientList = Array<TIngredient>;

// **useLocation type**
export interface TLocationState extends Location {
    from: string;
    pushLocation?: Location;
}

// **начинки в конструкторе**
export type TFiller = {
    item: TIngredient;
    constructorId: string;
}

// **тип ингредиента**
export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v?: number;
}

// **тип ингредиента для конструктора**
export type TConstructorIngredient = TIngredient & {
    constructorId: string;
}

// **тип для приходящего списка заказов**
export type TallOrdersList =
    | []
    | Array<TOrder>;

// **тип заказа**
export type TOrder = {
    ingredients: Array<string>;
    number: number;
    _id: string;
    owner: TUser;
    status: TOrderStatusCode;
    name: string;
    createdAt: Date;
    price: number;
}

// **типы отображаемых иконок из сторонноей либы**
export type TIcons =
    | 'CurrencyIcon'
    | 'BurgerIcon'
    | 'LockIcon'
    | 'DragIcon'
    | 'DeleteIcon'
    | 'ArrowUpIcon'
    | 'MenuIcon'
    | 'CloseIcon'
    | 'CheckMarkIcon'
    | 'ListIcon'
    | 'ProfileIcon'
    | 'EditIcon'
    | 'InfoIcon'
    | 'ShowIcon'
    | 'HideIcon'
    | 'LogoutIcon'

// **типы статусов заказов**
export type TOrderStatus = 'Выполнен' | 'Готовится' | 'Создан' | 'Отменен';
export type TOrderStatusCode = 'done' | 'pending' | 'created' | 'cancel';

// **тип данных пользователя**
export type TUser = { email?: string; name?: string; password?: string, token?: string };

// **отдельный тип для роутера**
export type TProtectedHOC = {
    path: string;
    exact: boolean;
}