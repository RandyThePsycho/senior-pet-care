// src/components/common/AffiliateDisclosure.tsx
// Affiliate 披露预留位置。Feature A MVP 中只有在出现产品推荐时才显示。
// 当前结果页的下一步卡片仅做跳转，不直接展示带货商品，因此默认不渲染；
// 预留此组件，供 Feature B / 含 affiliate 链接的页面调用。

export default function AffiliateDisclosure() {
  return (
    <p className="text-xs leading-relaxed text-navy-400">
      Some links on this site are affiliate links. If you buy through them, we
      may earn a small commission at no extra cost to you. We only recommend
      products we believe can genuinely help senior pets.
    </p>
  );
}
