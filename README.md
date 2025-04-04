# Test Design App

Test Design App, kullanıcıların bir tuval üzerinde çizim yapmasına, şekiller eklemesine, geri alma/ileri alma işlemleri yapmasına ve tasarımlarını kaydetmesine olanak tanıyan bir Nuxt 3 tabanlı bir uygulamadır. Bu uygulama, Vue 3 ve Fabric.js kullanılarak geliştirilmiştir.

## Özellikler

- **Çizim Araçları**: Fırça ile çizim yapma, renk ve genişlik ayarlama.
- **Şekil Ekleme**: Dikdörtgen, daire ve üçgen ekleme.
- **Metin Ekleme**: Tuvale metin kutuları ekleme.
- **Geri Alma/İleri Alma**: Yapılan işlemleri geri alma ve yeniden uygulama (Henüz basit bir halde tam anlamıyla geri ve ileri alma işlemlerini yapamıyor useHistory.ts ve useCanvas(undo_deneme).ts de yer almaktadır).
- **Kaydetme**: Tasarımları PNG veya JPEG formatında kaydetme.
- **Tema Desteği**: Açık ve koyu tema arasında geçiş yapma.

## Kurulum

Projeyi çalıştırmadan önce bağımlılıkları yükleyin:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Geliştirme Sunucusu

Geliştirme sunucusunu başlatmak için aşağıdaki komutlardan birini kullanın. Sunucu `http://localhost:3000` adresinde çalışacaktır:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Üretim

Uygulamayı üretim için derlemek ve önizlemek için aşağıdaki adımları izleyin:

### Derleme

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

### Üretim Önizlemesi

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```


