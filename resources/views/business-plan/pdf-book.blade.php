
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $businessPlan->name }} - Businessplan</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    @if($layout === 'executive')
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
    @elseif($layout === 'minimal')
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap" rel="stylesheet">
    @else
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    @endif

    <style>
        @php
            $themes = [
                'klassisch' => [
                    'sidebar_bg'      => '#1e293b',
                    'sidebar_text'    => '#cbd5e1',
                    'sidebar_heading' => '#94a3b8',
                    'chapter_bg'      => '#334155',
                    'chapter_text'    => '#ffffff',
                    'chapter_badge'   => 'rgba(255,255,255,0.12)',
                    'accent'          => '#38bdf8',
                    'body_bg'         => '#f8fafc',
                    'card_bg'         => '#ffffff',
                    'heading_color'   => '#1e293b',
                    'text_color'      => '#475569',
                    'border_color'    => '#e2e8f0',
                    'badge_bg'        => '#f1f5f9',
                    'badge_text'      => '#64748b',
                    'ai_bg'           => '#f5f3ff',
                    'ai_text'         => '#7c3aed',
                    'num_bg'          => '#f1f5f9',
                    'num_text'        => '#475569',
                    'footer_bg'       => '#1e293b',
                    'btn_bg'          => '#3b82f6',
                    'btn_hover'       => '#2563eb',
                    'body_font'       => "'Inter', sans-serif",
                    'heading_font'    => "'Inter', sans-serif",
                ],
                'modern' => [
                    'sidebar_bg'      => '#4c1d95',
                    'sidebar_text'    => '#ddd6fe',
                    'sidebar_heading' => '#a78bfa',
                    'chapter_bg'      => 'linear-gradient(135deg, #7c3aed 0%, #4c1d95 100%)',
                    'chapter_text'    => '#ffffff',
                    'chapter_badge'   => 'rgba(255,255,255,0.15)',
                    'accent'          => '#a78bfa',
                    'body_bg'         => '#f5f3ff',
                    'card_bg'         => '#ffffff',
                    'heading_color'   => '#4c1d95',
                    'text_color'      => '#374151',
                    'border_color'    => '#ede9fe',
                    'badge_bg'        => '#ede9fe',
                    'badge_text'      => '#6d28d9',
                    'ai_bg'           => '#ede9fe',
                    'ai_text'         => '#7c3aed',
                    'num_bg'          => '#ede9fe',
                    'num_text'        => '#7c3aed',
                    'footer_bg'       => '#4c1d95',
                    'btn_bg'          => '#7c3aed',
                    'btn_hover'       => '#6d28d9',
                    'body_font'       => "'Inter', sans-serif",
                    'heading_font'    => "'Inter', sans-serif",
                ],
                'minimal' => [
                    'sidebar_bg'      => '#111111',
                    'sidebar_text'    => '#d1d1d1',
                    'sidebar_heading' => '#888888',
                    'chapter_bg'      => '#111111',
                    'chapter_text'    => '#ffffff',
                    'chapter_badge'   => 'rgba(255,255,255,0.08)',
                    'accent'          => '#111111',
                    'body_bg'         => '#ffffff',
                    'card_bg'         => '#ffffff',
                    'heading_color'   => '#111111',
                    'text_color'      => '#333333',
                    'border_color'    => '#e5e5e5',
                    'badge_bg'        => '#f5f5f5',
                    'badge_text'      => '#555555',
                    'ai_bg'           => '#f5f5f5',
                    'ai_text'         => '#333333',
                    'num_bg'          => '#111111',
                    'num_text'        => '#ffffff',
                    'footer_bg'       => '#111111',
                    'btn_bg'          => '#111111',
                    'btn_hover'       => '#333333',
                    'body_font'       => "'Merriweather', serif",
                    'heading_font'    => "'Merriweather', serif",
                ],
                'executive' => [
                    'sidebar_bg'      => '#0a0a0a',
                    'sidebar_text'    => '#d4af6a',
                    'sidebar_heading' => '#8a7040',
                    'chapter_bg'      => '#0a0a0a',
                    'chapter_text'    => '#d4af6a',
                    'chapter_badge'   => 'rgba(212,175,106,0.12)',
                    'accent'          => '#d4af6a',
                    'body_bg'         => '#fdfdf9',
                    'card_bg'         => '#ffffff',
                    'heading_color'   => '#0a0a0a',
                    'text_color'      => '#3d3d3d',
                    'border_color'    => '#e8e0cc',
                    'badge_bg'        => '#fdf8ee',
                    'badge_text'      => '#8a7040',
                    'ai_bg'           => '#fdf8ee',
                    'ai_text'         => '#8a7040',
                    'num_bg'          => '#0a0a0a',
                    'num_text'        => '#d4af6a',
                    'footer_bg'       => '#0a0a0a',
                    'btn_bg'          => '#d4af6a',
                    'btn_hover'       => '#c49a50',
                    'body_font'       => "'Inter', sans-serif",
                    'heading_font'    => "'Playfair Display', serif",
                ],
                'natur' => [
                    'sidebar_bg'      => '#14532d',
                    'sidebar_text'    => '#bbf7d0',
                    'sidebar_heading' => '#86efac',
                    'chapter_bg'      => 'linear-gradient(135deg, #166534 0%, #14532d 100%)',
                    'chapter_text'    => '#ffffff',
                    'chapter_badge'   => 'rgba(255,255,255,0.12)',
                    'accent'          => '#4ade80',
                    'body_bg'         => '#f0fdf4',
                    'card_bg'         => '#ffffff',
                    'heading_color'   => '#14532d',
                    'text_color'      => '#374151',
                    'border_color'    => '#dcfce7',
                    'badge_bg'        => '#dcfce7',
                    'badge_text'      => '#15803d',
                    'ai_bg'           => '#dcfce7',
                    'ai_text'         => '#15803d',
                    'num_bg'          => '#dcfce7',
                    'num_text'        => '#15803d',
                    'footer_bg'       => '#14532d',
                    'btn_bg'          => '#16a34a',
                    'btn_hover'       => '#15803d',
                    'body_font'       => "'Inter', sans-serif",
                    'heading_font'    => "'Inter', sans-serif",
                ],
            ];
            $t = $themes[$layout ?? 'klassisch'] ?? $themes['klassisch'];
        @endphp

        :root {
            --sidebar-bg: {{ $t['sidebar_bg'] }};
            --sidebar-text: {{ $t['sidebar_text'] }};
            --sidebar-heading: {{ $t['sidebar_heading'] }};
            --chapter-bg: {{ $t['chapter_bg'] }};
            --chapter-text: {{ $t['chapter_text'] }};
            --chapter-badge: {{ $t['chapter_badge'] }};
            --accent: {{ $t['accent'] }};
            --body-bg: {{ $t['body_bg'] }};
            --card-bg: {{ $t['card_bg'] }};
            --heading-color: {{ $t['heading_color'] }};
            --text-color: {{ $t['text_color'] }};
            --border-color: {{ $t['border_color'] }};
            --badge-bg: {{ $t['badge_bg'] }};
            --badge-text: {{ $t['badge_text'] }};
            --ai-bg: {{ $t['ai_bg'] }};
            --ai-text: {{ $t['ai_text'] }};
            --num-bg: {{ $t['num_bg'] }};
            --num-text: {{ $t['num_text'] }};
            --footer-bg: {{ $t['footer_bg'] }};
            --btn-bg: {{ $t['btn_bg'] }};
            --btn-hover: {{ $t['btn_hover'] }};
        }

        * { box-sizing: border-box; }

        body {
            font-family: {{ $t['body_font'] }};
            background-color: var(--body-bg);
            color: var(--text-color);
            margin: 0;
            -webkit-font-smoothing: antialiased;
        }

        h1, h2, h3, h4, h5 {
            font-family: {{ $t['heading_font'] }};
            color: var(--heading-color);
        }

        @media print {
            .no-print, .sidebar { display: none !important; }
            .main-content { margin-left: 0 !important; }
            .page-break { page-break-before: always; }
            .avoid-break { page-break-inside: avoid; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }

        .sidebar {
            background: var(--sidebar-bg);
            color: var(--sidebar-text);
        }
        .sidebar-heading { color: var(--sidebar-heading); }
        .nav-link { transition: all 0.15s ease; color: var(--sidebar-text); }
        .nav-link:hover { background-color: rgba(255,255,255,0.07); color: #fff; }
        .nav-link.active { background-color: rgba(255,255,255,0.12); color: #fff; border-left-color: var(--accent); }

        .chapter-header {
            background: var(--chapter-bg);
            color: var(--chapter-text);
        }
        .chapter-badge {
            background: var(--chapter-badge);
            color: var(--chapter-text);
        }
        .chapter-title { color: var(--chapter-text); font-family: {{ $t['heading_font'] }}; }

        .section-card {
            background: var(--card-bg);
            border-bottom: 1px solid var(--border-color);
        }
        .section-title { color: var(--heading-color); font-family: {{ $t['heading_font'] }}; }
        .section-num {
            background: var(--num-bg);
            color: var(--num-text);
        }
        .ai-badge { background: var(--ai-bg); color: var(--ai-text); }
        .section-footer { background: var(--footer-bg); }

        .btn-primary {
            background: var(--btn-bg);
            color: #ffffff;
            transition: background 0.15s;
        }
        .btn-primary:hover { background: var(--btn-hover); }

        .prose { max-width: none; line-height: 1.75; }
        .prose p { margin-bottom: 1rem; }
        .prose ul, .prose ol { margin-bottom: 1rem; padding-left: 1.5rem; }
        .prose li { margin-bottom: 0.5rem; }
        .prose h3 { font-size: 1.125rem; font-weight: 600; margin-top: 1.5rem; margin-bottom: 0.5rem; color: var(--heading-color); }
        .prose h4 { font-size: 1rem; font-weight: 600; margin-top: 1.25rem; margin-bottom: 0.5rem; color: var(--heading-color); }
        .prose b, .prose strong { color: var(--heading-color); }
        html { scroll-behavior: smooth; }
    </style>
</head>
<body>
    @if(empty($isPdfDownload))
    {{-- Fixed Left Sidebar --}}
    <aside class="sidebar fixed left-0 top-0 bottom-0 w-64 overflow-y-auto z-40 flex flex-col" style="font-family: {{ $t['body_font'] }}">
        {{-- Header --}}
        <div class="p-5" style="border-bottom: 1px solid rgba(255,255,255,0.1)">
            <p class="sidebar-heading text-xs font-semibold uppercase tracking-wider mb-1">Businessplan</p>
            <h1 class="font-semibold text-base truncate" style="color: var(--sidebar-text)">{{ $businessPlan->name }}</h1>
            <p class="text-xs mt-1" style="color: var(--sidebar-heading)">{{ now()->format('d.m.Y') }}</p>
        </div>

        {{-- Navigation --}}
        <nav class="flex-1 overflow-y-auto py-4">
            @foreach($groupedSections as $category => $categorySections)
                <div class="mb-4">
                    <h3 class="sidebar-heading px-5 py-1 text-xs font-semibold uppercase tracking-wider">
                        {{ $category }}
                    </h3>
                    <ul>
                        @foreach($categorySections as $section)
                            <li>
                                <a href="#section-{{ $section->id }}"
                                   class="nav-link block px-5 py-2 text-sm border-l-2 border-transparent"
                                   data-section="{{ $section->id }}">
                                    {{ $section->title }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endforeach
        </nav>

        {{-- Actions --}}
        <div class="p-4 space-y-2" style="border-top: 1px solid rgba(255,255,255,0.1)">
            <a href="{{ route('business-plan.pdf.download', ['businessPlan' => $businessPlan, 'layout' => $layout]) }}"
               class="btn-primary flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-lg no-print">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
                PDF herunterladen
            </a>
            <button onclick="window.print()"
                    class="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-medium rounded-lg no-print"
                    style="background:rgba(255,255,255,0.08); color:var(--sidebar-text)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                </svg>
                Drucken
            </button>
            <a href="{{ url()->previous() }}"
               class="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm no-print"
               style="color: var(--sidebar-heading)">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Zurück
            </a>
        </div>
    </aside>
    @endif

    {{-- Main Content --}}
    <main class="main-content {{ empty($isPdfDownload) ? 'ml-64' : '' }}">
        @foreach($groupedSections as $category => $categorySections)
            {{-- Chapter header --}}
            <div class="chapter-header px-8 py-10" style="background: {{ $t['chapter_bg'] }}">
                <div class="max-w-4xl mx-auto">
                    <span class="chapter-badge inline-block px-3 py-1 rounded-full text-xs font-medium mb-3">
                        Kapitel {{ $loop->iteration }}
                    </span>
                    <h2 class="chapter-title text-3xl font-bold">{{ $category }}</h2>
                </div>
            </div>

            @foreach($categorySections as $section)
                <article id="section-{{ $section->id }}" class="section-card avoid-break">
                    <div class="max-w-4xl mx-auto px-8 py-10">
                        <header class="mb-6">
                            <div class="flex items-center gap-3 mb-3">
                                <span class="section-num inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold">
                                    {{ $section->order_index }}
                                </span>
                                @if($section->ai_generated)
                                    <span class="ai-badge inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium">
                                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                                        </svg>
                                        KI-generiert
                                    </span>
                                @endif
                            </div>
                            <h3 class="section-title text-2xl font-bold">{{ $section->title }}</h3>
                        </header>
                        <div class="prose">
                            {!! $section->text !!}
                        </div>
                    </div>
                </article>
            @endforeach
        @endforeach

        {{-- Footer --}}
        <footer class="section-footer px-8 py-12" style="background: var(--footer-bg)">
            <div class="max-w-4xl mx-auto text-center">
                <p class="text-sm" style="color: rgba(255,255,255,0.5)">
                    Erstellt mit <span style="color: rgba(255,255,255,0.9); font-weight: 500">Stratify</span>
                </p>
                <div class="flex items-center justify-center gap-4 mt-3 text-xs" style="color: rgba(255,255,255,0.35)">
                    <span>{{ $businessPlan->name }}</span>
                    <span>•</span>
                    <span>{{ now()->format('d.m.Y') }}</span>
                    <span>•</span>
                    <span>{{ $sections->count() }} Abschnitte</span>
                </div>
            </div>
        </footer>
    </main>

    @if(empty($isPdfDownload))
    <script>
        const sections = document.querySelectorAll('article[id^="section-"]');
        const navLinks = document.querySelectorAll('.nav-link[data-section]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id.replace('section-', '');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.dataset.section === sectionId) link.classList.add('active');
                    });
                }
            });
        }, { rootMargin: '-20% 0px -70% 0px' });
        sections.forEach(section => observer.observe(section));
    </script>
    @endif
</body>
</html>
