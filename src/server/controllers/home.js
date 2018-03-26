import render from '../render';

export default async (ctx, next) => {
  ctx.body = await render(
    <div>home123</div>
  );
  // await next();
}