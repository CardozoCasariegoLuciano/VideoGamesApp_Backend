let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
let NERDTreeMapPreviewSplit = "gi"
let NERDTreeMapCloseChildren = "X"
let NERDTreeHijackNetrw =  1 
let NERDTreeShowHidden =  0 
let EasyMotion_off_screen_search =  1 
let NERDTreeMapCloseDir = "x"
let EasyMotion_enter_jump_first =  0 
let NERDTreeSortHiddenFirst =  1 
let NERDUsePlaceHolders =  1 
let NERDTreeMapRefresh = "r"
let UltiSnipsExpandTrigger = "<F5>"
let EasyMotion_use_migemo =  0 
let NERDTreeRespectWildIgnore =  0 
let NERDTreeAutoDeleteBuffer =  0 
let EasyMotion_smartcase =  1 
let NERDRemoveExtraSpaces =  0 
let NERDTreeBookmarksFile = "/home/luciano/.NERDTreeBookmarks"
let UltiSnipsJumpForwardTrigger = "<c-j>"
let NERDTreeMapToggleHidden = "I"
let NERDTreeWinSize =  31 
let NERDTreeMenuUp = "k"
let NERDTreeUseTCD =  0 
let EasyMotion_use_upper =  0 
let UltiSnipsRemoveSelectModeMappings =  1 
let EasyMotion_keys = "asdghklqwertyuiopzxcvbnmfj;"
let EasyMotion_hl_group_target = "EasyMotionTarget"
let NERDTreeMapPreview = "go"
let EasyMotion_do_mapping =  1 
let NERDTreeCascadeSingleChildDir =  1 
let EasyMotion_ignore_exception =  0 
let Taboo_tabs = ""
let NERDTreeNotificationThreshold =  100 
let NERDTreeMapActivateNode = "o"
let NERDTreeMapCustomOpen = "<CR>"
let EasyMotion_hl_inc_search = "EasyMotionIncSearch"
let NERDTreeDirArrowExpandable = "▸"
let EasyMotion_disable_two_key_combo =  0 
let NERDTreeMapMenu = "m"
let EasyMotion_space_jump_first =  0 
let NERDTreeStatusline = "%{exists('b:NERDTree')?b:NERDTree.root.path.str():''}"
let EasyMotion_use_regexp =  1 
let NERDTreeMapOpenInTabSilent = "T"
let NERDTreeMapHelp = "?"
let EasyMotion_move_highlight =  1 
let NERDTreeMapJumpParent = "p"
let NERDTreeMapToggleFilters = "f"
let EasyMotion_hl_inc_cursor = "EasyMotionIncCursor"
let NERDTreeMapJumpPrevSibling = "<C-k>"
let NERDTreeNodeDelimiter = ""
let NERDTreeShowBookmarks =  0 
let NERDMenuMode =  3 
let NERDTreeRemoveDirCmd = "rm -rf "
let NERDTreeMapOpenInTab = "t"
let EasyMotion_show_prompt =  1 
let EasyMotion_add_search_history =  1 
let NERDTreeChDirMode =  0 
let EasyMotion_do_shade =  1 
let NERDTreeCreatePrefix = "silent"
let NERDTreeMinimalUI =  0 
let EasyMotion_grouping =  1 
let NERDTreeAutoCenterThreshold =  3 
let NERDTreeShowFiles =  1 
let NERDToggleCheckAllLines =  0 
let NERDTreeMapOpenSplit = "i"
let EasyMotion_skipfoldedline =  1 
let NERDTreeCaseSensitiveSort =  0 
let NERDSpaceDelims =  0 
let EasyMotion_hl_move = "EasyMotionMoveHL"
let NERDTreeShowLineNumbers =  0 
let NERDTreeBookmarksSort =  1 
let NERDTreeHighlightCursorline =  1 
let UltiSnipsEnableSnipMate =  1 
let NERDLPlace = "[>"
let NERDDefaultAlign = "none"
let NERDTreeMouseMode =  1 
let NERDTreeMapCWD = "CD"
let EasyMotion_re_line_anywhere = "\\v(<.|^$)|(.>|^$)|(\\l)\\zs(\\u)|(_\\zs.)|(#\\zs.)"
let NERDCreateDefaultMappings =  1 
let EasyMotion_re_anywhere = "\\v(<.|^$)|(.>|^$)|(\\l)\\zs(\\u)|(_\\zs.)|(#\\zs.)"
let NERDTreeNaturalSort =  0 
let EasyMotion_verbose =  1 
let NERDTreeMenuDown = "j"
let NERDTreeMapPreviewVSplit = "gs"
let NERDTreeMapUpdir = "u"
let NERDTreeMapJumpRoot = "P"
let NERDCommentWholeLinesInVMode =  0 
let UltiSnipsJumpBackwardTrigger = "<c-k>"
let EasyMotion_hl2_first_group_target = "EasyMotionTarget2First"
let NERDTreeGlyphReadOnly = "RO"
let NERDTreeMapChdir = "cd"
let NERDRPlace = "<]"
let NERDTreeMapToggleZoom = "A"
let NERDTreeMarkBookmarks =  1 
let NERDDefaultNesting =  1 
let NERDTreeMinimalMenu =  0 
let NERDTreeMapRefreshRoot = "R"
let EasyMotion_cursor_highlight =  1 
let NERDSuppressWarnings =  0 
let NERDRemoveAltComs =  1 
let NERDTreeAutoCenter =  1 
let NERDTreeCascadeOpenSingleChildDir =  1 
let EasyMotion_hl2_second_group_target = "EasyMotionTarget2Second"
let NERDTreeMapOpenVSplit = "s"
let EasyMotion_startofline =  1 
let NERDTreeMapJumpLastChild = "J"
let NERDTreeWinPos = "left"
let NERDTrimTrailingWhitespace =  0 
let NERDTreeMapDeleteBookmark = "D"
let UltiSnipsListSnippets = "<c-tab>"
let NERDBlockComIgnoreEmpty =  0 
let NERDCommentEmptyLines =  0 
let NERDDisableTabsInBlockComm =  0 
let NERDTreeMapJumpNextSibling = "<C-j>"
let EasyMotion_inc_highlight =  1 
let UltiSnipsEditSplit = "vertical"
let NERDTreeMapQuit = "q"
let NERDTreeMapChangeRoot = "C"
let NERDCompactSexyComs =  0 
let NERDTreeSortDirs =  1 
let NERDTreeMapToggleFiles = "F"
let NERDAllowAnyVisualDelims =  1 
let EasyMotion_force_csapprox =  0 
let EasyMotion_loaded =  1 
let NERDTreeMapOpenExpl = "e"
let NERDTreeMapJumpFirstChild = "K"
let NERDTreeDirArrowCollapsible = "▾"
let EasyMotion_hl_group_shade = "EasyMotionShade"
let NERDTreeMapOpenRecursively = "O"
let NERDTreeMapToggleBookmarks = "B"
let NERDTreeCopyCmd = "cp -r "
let NERDTreeMapUpdirKeepOpen = "U"
let EasyMotion_landing_highlight =  0 
let NERDTreeQuitOnOpen =  1 
let EasyMotion_prompt = "Search for {n} character(s): "
silent only
silent tabonly
cd ~/Escritorio/Mis_cosas/desarrollo\ web\ /Mis-Proyectos/Full_Stack/MERN-App-de-Juegos/backend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
$argadd app.js
tabnew
tabnew
tabrewind
edit tests/videogames.test.js
set splitbelow splitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
15
normal! zo
15
normal! zo
74
normal! zo
80
normal! zo
80
normal! zo
81
normal! zo
81
normal! zo
82
normal! zo
87
normal! zo
94
normal! zo
28
normal! zo
28
normal! zo
29
normal! zo
29
normal! zo
30
normal! zo
35
normal! zo
42
normal! zo
48
normal! zo
48
normal! zo
49
normal! zo
49
normal! zo
50
normal! zc
58
normal! zo
58
normal! zo
74
normal! zo
74
normal! zc
74
normal! zc
90
normal! zo
90
normal! zc
90
normal! zc
112
normal! zo
112
normal! zc
112
normal! zc
58
normal! zc
58
normal! zc
73
normal! zo
73
normal! zo
90
normal! zo
90
normal! zc
90
normal! zc
112
normal! zo
112
normal! zc
112
normal! zc
73
normal! zc
73
normal! zc
89
normal! zo
89
normal! zo
112
normal! zo
112
normal! zc
112
normal! zc
110
normal! zo
110
normal! zo
125
normal! zc
110
normal! zc
110
normal! zc
132
normal! zo
132
normal! zo
134
normal! zo
134
normal! zc
134
normal! zc
132
normal! zc
132
normal! zc
49
normal! zc
131
normal! zo
131
normal! zo
133
normal! zo
141
normal! zo
151
normal! zo
163
normal! zo
let s:l = 155 - ((18 * winheight(0) + 26) / 53)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
155
normal! 035|
tabnext
edit tests/helper.js
set splitbelow splitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
9
normal! zo
15
normal! zo
37
normal! zo
41
normal! zo
let s:l = 53 - ((52 * winheight(0) + 26) / 53)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
53
normal! 0
tabnext
edit controllers/videogames.controllers.js
set splitbelow splitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=syntax
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=99
setlocal fml=1
setlocal fdn=20
setlocal fen
7
normal! zo
7
normal! zc
22
normal! zo
26
normal! zo
26
normal! zo
27
normal! zo
34
normal! zo
43
normal! zo
43
normal! zo
33
normal! zo
41
normal! zo
50
normal! zo
50
normal! zo
41
normal! zo
50
normal! zo
50
normal! zo
59
normal! zo
69
normal! zo
81
normal! zo
82
normal! zo
22
normal! zc
59
normal! zo
69
normal! zo
81
normal! zo
82
normal! zo
let s:l = 61 - ((60 * winheight(0) + 26) / 53)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
61
normal! 0
tabnext 1
badd +15 app.js
badd +50 tests/categories.test.js
badd +54 ~/.vimrc
badd +5 routes/category.route.js
badd +27 controllers/category.controller.js
badd +80 ~/Escritorio/Mis_cosas/MisCosas/setUp-config/.vim/map.vim
badd +75 ~/Escritorio/Mis_cosas/MisCosas/setUp-config/.vim/plugin-configs.vim
badd +0 tests/helper.js
badd +40 controllers/videogames.controllers.js
badd +0 routes/videogames.routes.js
badd +0 tests/videogames.test.js
badd +30 models/videogames.model.js
badd +7 package.json
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOSc
set winminheight=1 winminwidth=1
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
