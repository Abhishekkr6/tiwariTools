"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Plus, Trash2, Edit2, Image as ImageIcon, FileText, Settings, Key, Zap, Package, LayoutGrid } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Tab = 'content' | 'products' | 'categories'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [content, setContent] = useState<any>(null)
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Form states
  const [editingItem, setEditingItem] = useState<any>(null)
  const [editType, setEditType] = useState<'product' | 'category' | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const pRes = await fetch('/api/admin/sync?type=products').then(r => r.json())
      const cRes = await fetch('/api/admin/sync?type=categories').then(r => r.json())
      const tRes = await fetch('/api/admin/sync?type=content').then(r => r.json())
      
      setProducts(pRes.data || [])
      setCategories(cRes.data || [])
      setContent(tRes.data || {})
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      await fetch('/api/admin/sync', { method: 'POST', body: JSON.stringify({ type: 'content', data: content }) })
      await fetch('/api/admin/sync', { method: 'POST', body: JSON.stringify({ type: 'products', data: products }) })
      await fetch('/api/admin/sync', { method: 'POST', body: JSON.stringify({ type: 'categories', data: categories }) })
      
      alert('All changes saved successfully!')
    } catch (e) {
      alert('Save failed.')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    
    if (products.find(p => p.id === editingItem.id)) {
      setProducts(products.map(p => p.id === editingItem.id ? editingItem : p))
    } else {
      setProducts([...products, editingItem])
    }
    setEditingItem(null)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    const formData = new FormData()
    formData.append('file', file)
    
    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData }).then(r => r.json())
      if (res.success) {
        setEditingItem({ ...editingItem, [field]: res.url })
      } else {
        alert('Upload failed: ' + res.error)
      }
    } catch (err) {
      alert('Upload error')
    }
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }
  
  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    
    if (categories.find(c => c.id === editingItem.id)) {
      setCategories(categories.map(c => c.id === editingItem.id ? editingItem : c))
    } else {
      setCategories([...categories, editingItem])
    }
    setEditingItem(null)
  }
  
  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== id))
    }
  }

  if (loading) {
    return <div className="flex h-[50vh] items-center justify-center text-zinc-500">Loading data...</div>
  }

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'content', label: 'Site Content', icon: FileText },
  ]

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
        <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/80 mb-4 shadow-xl">
          <p className="text-sm font-semibold text-zinc-400 mb-4 px-2 tracking-wider uppercase">Menu</p>
          <div className="flex flex-col gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all relative
                  ${activeTab === tab.id ? 'text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}`}
              >
                {activeTab === tab.id && (
                  <motion.div layoutId="active-tab" className="absolute inset-0 bg-zinc-800 rounded-lg -z-10 shadow-inner" />
                )}
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-primary' : ''}`} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        
        <Button onClick={handleSaveAll} disabled={saving} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
          <Save className="w-4 h-4 mr-2" />
          {saving ? 'Saving...' : 'Save All Changes'}
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50">
                <div>
                  <h2 className="text-2xl font-bold">Products Management</h2>
                  <p className="text-zinc-400 text-sm mt-1">Add, edit, or remove store products.</p>
                </div>
                <Button onClick={() => { setEditingItem({ id: 'new-' + Date.now(), name: '', category: '', image: '', description: '', useCase: '', tags: [] }); setEditType('product'); }}>
                  <Plus className="w-4 h-4 mr-2" /> Add Product
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map(product => (
                  <div key={product.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition">
                    <div className="h-40 bg-zinc-800 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-lg leading-tight truncate">{product.name}</h3>
                      <p className="text-zinc-500 text-xs mt-1 truncate">{product.category}</p>
                      <div className="flex items-center justify-between mt-4">
                        <Button variant="outline" size="sm" onClick={() => { setEditingItem({...product}); setEditType('product'); }} className="h-8">
                          <Edit2 className="w-3 h-3 mr-1" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'categories' && (
            <motion.div
              key="categories"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50">
                <div>
                  <h2 className="text-2xl font-bold">Categories</h2>
                  <p className="text-zinc-400 text-sm mt-1">Manage shop categories and their details.</p>
                </div>
                <Button onClick={() => { setEditingItem({ id: '', name: '', description: '', icon: '', image: '' }); setEditType('category'); }}>
                  <Plus className="w-4 h-4 mr-2" /> Add Category
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div key={category.id} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-xl flex items-center justify-between group hover:border-zinc-700 transition">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{category.icon}</div>
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-zinc-500">{category.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="outline" size="icon" onClick={() => { setEditingItem({...category}); setEditType('category'); }} className="h-8 w-8">
                          <Edit2 className="w-3 h-3" />
                       </Button>
                       <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 w-8">
                          <Trash2 className="w-3 h-3" />
                       </Button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50">
                <h2 className="text-2xl font-bold">Site Content</h2>
                <p className="text-zinc-400 text-sm mt-1">Edit all the main text strings shown on the website.</p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-medium mb-6 flex items-center gap-2"><LayoutGrid className="w-5 h-5 text-accent" /> Hero Section</h3>
                <div className="space-y-4 max-w-3xl">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Badge Text (Top)</label>
                    <input 
                      type="text" 
                      value={content.hero?.badge || ''} 
                      onChange={e => setContent({...content, hero: {...content.hero, badge: e.target.value}})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Headline</label>
                    <textarea 
                      value={content.hero?.headline || ''} 
                      onChange={e => setContent({...content, hero: {...content.hero, headline: e.target.value}})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none min-h-[80px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Subtext / Description</label>
                    <textarea 
                      value={content.hero?.subtext || ''} 
                      onChange={e => setContent({...content, hero: {...content.hero, subtext: e.target.value}})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none min-h-[100px]"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-medium mb-6 mt-10 flex items-center gap-2"><Key className="w-5 h-5 text-accent" /> Contact Info</h3>
                <div className="space-y-4 max-w-3xl">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">WhatsApp Number (with country code, e.g. 916206507964)</label>
                    <input 
                      type="text" 
                      value={content.hero?.whatsapp || ''} 
                      onChange={e => setContent({...content, hero: {...content.hero, whatsapp: e.target.value}})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">WhatsApp Default Message</label>
                    <input 
                      type="text" 
                      value={content.hero?.whatsappMessage || ''} 
                      onChange={e => setContent({...content, hero: {...content.hero, whatsappMessage: e.target.value}})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={content.hero?.phone || ''} 
                      onChange={e => setContent({...content, hero: {...content.hero, phone: e.target.value}})}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Edit Modal Cover */}
      <AnimatePresence>
        {editingItem && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto"
           >
             <motion.div 
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.95, opacity: 0 }}
               className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
             >
                <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Edit {editType === 'product' ? 'Product' : 'Category'}</h3>
                  <button onClick={() => setEditingItem(null)} className="text-zinc-500 hover:text-white p-2">✕</button>
                </div>
                
                <div className="p-6">
                  {editType === 'product' ? (
                     <form onSubmit={handleUpdateProduct} className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                           <input type="text" required value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-zinc-400 mb-1">Category ID</label>
                           <input type="text" required value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
                         </div>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-zinc-400 mb-1">Product Image</label>
                         <div className="flex items-center gap-4">
                           {editingItem.image && (
                             <img src={editingItem.image} alt="Preview" className="w-16 h-16 object-cover rounded-md border border-zinc-800" />
                           )}
                           <div className="flex-1">
                             <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                             <input type="text" required value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm mt-2" placeholder="Or enter URL here..." />
                           </div>
                         </div>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                         <textarea required value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 min-h-[80px]" />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-zinc-400 mb-1">Use Case</label>
                         <input type="text" required value={editingItem.useCase} onChange={e => setEditingItem({...editingItem, useCase: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-zinc-400 mb-1">Tags (Comma separated)</label>
                         <input type="text" value={editingItem.tags?.join(', ') || ''} onChange={e => setEditingItem({...editingItem, tags: e.target.value.split(',').map((t: string) => t.trim())})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
                       </div>
                       
                       <div className="pt-4 flex justify-end gap-3">
                         <Button type="button" variant="ghost" onClick={() => setEditingItem(null)}>Cancel</Button>
                         <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                       </div>
                     </form>
                  ) : (
                     <form onSubmit={handleUpdateCategory} className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-sm font-medium text-zinc-400 mb-1">ID (Slug-format)</label>
                           <input type="text" required value={editingItem.id} onChange={e => setEditingItem({...editingItem, id: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-zinc-400 mb-1">Name</label>
                           <input type="text" required value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
                         </div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-sm font-medium text-zinc-400 mb-1">Icon (Emoji or SVG string)</label>
                           <input type="text" required value={editingItem.icon} onChange={e => setEditingItem({...editingItem, icon: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2" />
                         </div>
                         <div>
                           <label className="block text-sm font-medium text-zinc-400 mb-1">Category Image</label>
                           <div className="flex flex-col gap-2">
                             <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'image')} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90" />
                             <input type="text" required value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm" placeholder="Or enter URL here..." />
                           </div>
                         </div>
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-zinc-400 mb-1">Description</label>
                         <textarea required value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 min-h-[80px]" />
                       </div>
                       
                       <div className="pt-4 flex justify-end gap-3">
                         <Button type="button" variant="ghost" onClick={() => setEditingItem(null)}>Cancel</Button>
                         <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
                       </div>
                     </form>
                  )}
                </div>
             </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
