<!DOCTYPE html>
<html>
    <head>
        <title>Manajemen Surat</title>
        @include('template.meta')
        <link rel="icon" href="/masariuman/favicon.png" type="image/png" sizes="16x16">
        <link href="apple-touch-icon.png" rel="apple-touch-icon">
        @include('template.css')
        <script src="/js/app.js" defer></script>
    </head>
    <body class="menu-position-side menu-side-left full-screen with-content-panel">
        <div class="all-wrapper with-side-panel solid-bg-all" id="root"></div>
        @include('template.js')
    </body>
</html>

@yield('modal')
