<pre><code class="hljs csharp"><span class="hljs-keyword">using</span> System;

<span class="hljs-preprocessor">#<span class="hljs-keyword">pragma</span> <span class="hljs-keyword">warning</span> disable 414, 3021</span>

<span class="hljs-keyword">public</span> <span class="hljs-keyword">class</span> <span class="hljs-title">Program</span>
{
    <span class="hljs-comment"><span class="hljs-xmlDocTag">///</span> <span class="hljs-xmlDocTag">&lt;summary&gt;</span>The entry point to the program.<span class="hljs-xmlDocTag">&lt;/summary&gt;</span></span>
    <span class="hljs-function"><span class="hljs-keyword">public</span> <span class="hljs-keyword">static</span> <span class="hljs-keyword">int</span> <span class="hljs-title">Main</span><span class="hljs-params">(<span class="hljs-keyword">string</span>[] args)</span>
    </span>{
        Console.WriteLine(<span class="hljs-string">"Hello, World!"</span>);
        <span class="hljs-keyword">string</span> s = <span class="hljs-string">@"This
""string""
spans
multiple
lines!"</span>;
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }
}

<span class="hljs-function"><span class="hljs-keyword">async</span> Task&lt;<span class="hljs-keyword">int</span>&gt; <span class="hljs-title">AccessTheWebAsync</span><span class="hljs-params">()</span>
</span>{
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">string</span> urlContents = <span class="hljs-keyword">await</span> getStringTask;
    <span class="hljs-keyword">return</span> urlContents.Length;
}</code></pre>