from django.urls import path
from .views.common import auth
from .views.setting import user,group,menu

urlpatterns = [
    # auth
    path("auth/",auth.AuthUserLogin.as_view(), name="web_auth"),
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
    path("menu/<int:Menu>/users",menu.MenuUserPermissionView.as_view(), name="menu_detail_users"),
    path("menu/<int:Menu>/groups",menu.MenuGroupPermissionView.as_view(), name="menu_detail_groups"),

]