<div class="menu-w color-scheme-dark color-style-bright menu-position-side menu-side-left menu-layout-mini sub-menu-style-over sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link">
    <div class="logo-w">
        <a class="logo" href="index.html">
            <div class="logo-element"></div>
            <div class="logo-label">
                Clean Admin
            </div>
        </a>
    </div>
    <div class="logged-user-w avatar-inline">
        <div class="logged-user-i">
            <div class="avatar-w">
                <img alt="" src="/warudo/dist/img/avatar1.jpg">
            </div>
            <div class="logged-user-info-w">
                <div class="logged-user-name">
                    MasariuMan
                </div>
                <div class="logged-user-role">
                    Administrator
                </div>
            </div>
            <div class="logged-user-toggler-arrow">
                <div class="os-icon os-icon-chevron-down"></div>
            </div>
            <div class="logged-user-menu color-style-bright">
                <div class="logged-user-avatar-info">
                    <div class="avatar-w">
                        <img alt="" src="/warudo/dist/img/avatar1.jpg">
                    </div>
                    <div class="logged-user-info-w">
                        <div class="logged-user-name">
                            MasariuMan
                        </div>
                        <div class="logged-user-role">
                            Administrator
                        </div>
                    </div>
                </div>
                <div class="bg-icon">
                    <i class="os-icon os-icon-wallet-loaded"></i>
                </div>
                <ul>
                    <li>
                        <a href="#"><i class="os-icon os-icon-signs-11"></i><span>Logout</span></a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="menu-actions">
        <!--------------------
                        START - Settings Link in secondary top menu
                -------------------->
        <div class="top-icon top-settings os-dropdown-trigger os-dropdown-position-right">
            <i class="os-icon os-icon-ui-46"></i>
            <div class="os-dropdown">
                <div class="icon-w">
                    <i class="os-icon os-icon-ui-46"></i>
                </div>
                <ul>
                    <li>
                        <a href="users_profile_small.html"><i class="os-icon os-icon-ui-49"></i><span>Profile Settings</span></a>
                    </li>
                </ul>
            </div>
        </div>
        <!--------------------
                        END - Settings Link in secondary top menu
                -------------------->
    </div>
    <div class="element-search autosuggest-search-activator">
        <input placeholder="Start typing to search..." type="text">
    </div>
    <h1 class="menu-page-header">
        Page Header
    </h1>
    <ul class="main-menu">
        <li class="sub-header">
            <span>Layouts</span>
        </li>
        <li class="selected has-sub-menu">
            <a href="index.html" class ="{{ Request::is('/') ? 'masariuman-active' : '' }}">
                <div class="icon-w">
                    <div class="os-icon os-icon-layout"></div>
                </div>
                <span>Dashboard</span>
            </a>
            <div class="sub-menu-w">
                <div class="sub-menu-header">
                    Dashboard
                </div>
                <div class="sub-menu-icon">
                    <i class="os-icon os-icon-layout"></i>
                </div>
                <div class="sub-menu-i">
                    <ul class="sub-menu">
                        <li>
                            <a href="index.html">Dashboard 1</a>
                        </li>
                        <li>
                            <a href="apps_crypto.html">Crypto Dashboard <strong class="badge badge-danger">Hot</strong></a>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
        <li class=" has-sub-menu">
            <a href="layouts_menu_top_image.html" class ="{{ Request::is('d') ? 'masariuman-active' : '' }}">
                <div class="icon-w">
                    <div class="os-icon os-icon-layers"></div>
                </div>
                <span>Menu Styles</span>
            </a>
            <div class="sub-menu-w">
                <div class="sub-menu-header">
                    Menu Styles
                </div>
                <div class="sub-menu-icon">
                        <i class="os-icon os-icon-layers"></i>
                </div>
                <div class="sub-menu-i">
                    <ul class="sub-menu">
                        <li>
                            <a href="layouts_menu_side_full.html">Side Menu Light</a>
                        </li>
                        <li>
                            <a href="layouts_menu_side_full_dark.html">Side Menu Dark</a>
                        </li>
                    </ul>
                    <ul class="sub-menu">
                        <li>
                            <a href="layouts_menu_side_mini_dark.html">Mini Menu Dark</a>
                        </li>
                        <li>
                            <a href="layouts_menu_side_compact.html">Compact Side Menu</a>
                        </li>
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>
