import{u as m,b as f,s as o,z as p}from"./index.DRygy6t_.js";import{m as _}from"./useSiteSettings.BgNhNm9p.js";const b=()=>{const{currentLanguage:i}=m();return f({queryKey:["multilingual_articles",i],queryFn:async()=>{const{data:a,error:l}=await o.from("articles").select(`
          id,
          author,
          category,
          image_url,
          is_featured,
          published_at,
          created_at,
          updated_at,
          article_translations!inner(
            id,
            title,
            excerpt,
            content,
            slug,
            language_code
          )
        `).eq("article_translations.language_code",i).order("published_at",{ascending:!1});if(l)throw console.error("Error fetching articles:",l),l;return(a==null?void 0:a.map(t=>{var r,n,s,e,c,u,g,d;return{...t,title:((n=(r=t.article_translations)==null?void 0:r[0])==null?void 0:n.title)||"",excerpt:((e=(s=t.article_translations)==null?void 0:s[0])==null?void 0:e.excerpt)||"",content:((u=(c=t.article_translations)==null?void 0:c[0])==null?void 0:u.content)||"",slug:((d=(g=t.article_translations)==null?void 0:g[0])==null?void 0:d.slug)||""}}))||[]},enabled:!!i})},q=()=>{const i=p();return _({mutationFn:async({articleData:a,translations:l})=>{const{data:t,error:r}=await o.from("articles").insert(a).select().single();if(r)throw console.error("Error creating article:",r),r;const n=Object.entries(l).map(([s,e])=>e.title?o.from("article_translations").insert({article_id:t.id,language_code:s,title:e.title,excerpt:e.excerpt||"",content:e.content||"",slug:e.slug||e.title.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,"")}):null).filter(Boolean);return await Promise.all(n),t},onSuccess:()=>{i.invalidateQueries({queryKey:["multilingual_articles"]})}})},x=()=>{const i=p();return _({mutationFn:async({articleId:a,articleData:l,translations:t})=>{const{error:r}=await o.from("articles").update(l).eq("id",a);if(r)throw console.error("Error updating article:",r),r;const n=Object.entries(t).map(([s,e])=>e.title?o.from("article_translations").upsert({article_id:a,language_code:s,title:e.title,excerpt:e.excerpt||"",content:e.content||"",slug:e.slug||e.title.toLowerCase().replace(/\s+/g,"-").replace(/[^a-z0-9-]/g,""),updated_at:new Date().toISOString()},{onConflict:"article_id,language_code"}):null).filter(Boolean);await Promise.all(n)},onSuccess:()=>{i.invalidateQueries({queryKey:["multilingual_articles"]})}})};export{q as a,x as b,b as u};
