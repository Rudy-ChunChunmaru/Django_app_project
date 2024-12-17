from django.urls import path
from web.views.setting import user,group,menu

urlpatterns = [
    # user {page,rage,filter}
    path("user/",user.UserView.as_view(), name="user"),
    path("user/<str:username>/",user.UserDetailView.as_view(), name="user_detail"),
    path("user/<str:username>/change_password",user.UserChangePasswordView.as_view(), name="user_change_password"),
    # group {page,rage,filter}
    path("group/",group.GroupView.as_view(), name="group"),
    path("group/<str:name>/",group.GroupDetailView.as_view(), name="group_detail"),
    # menu {page,rage,filter}
    path("menu/",menu.MenuView.as_view(), name="menu"),
    path("menu/<int:id>/",menu.MenuDetailView.as_view(), name="menu_detail"),
    # menu permit {page,rage,filter}
    path("menupermituser/",menu.MenuUserPermissionView.as_view(), name="menu_permit_users"),
    path("menupermituser/<int:id>/",menu.MenuUserPermissionDetailView.as_view(), name="menu_permit_users_detail"),
    path("menupermitgroup/",menu.MenuGroupPermissionView.as_view(), name="menu_permit_groups"),
    path("menupermitgroup/<int:id>/",menu.MenuGroupPermissionDetailView.as_view(), name="menu_permit_users_detail"),
]