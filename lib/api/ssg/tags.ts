export const SERVICE_TAGS = ["svc:pet","svc:store","svc:user"] as const;
export type ServiceTag = typeof SERVICE_TAGS[number];
export const OP_TAGS = {
  "pet": [
    "op:uploadFile",
    "op:addPet",
    "op:updatePet",
    "op:findPetsByStatus",
    "op:findPetsByTags",
    "op:getPetById",
    "op:updatePetWithForm",
    "op:deletePet"
  ],
  "store": [
    "op:getInventory",
    "op:placeOrder",
    "op:getOrderById",
    "op:deleteOrder"
  ],
  "user": [
    "op:createUsersWithListInput",
    "op:getUserByName",
    "op:updateUser",
    "op:deleteUser",
    "op:loginUser",
    "op:logoutUser",
    "op:createUsersWithArrayInput",
    "op:createUser"
  ]
} as const;
export type ServiceKey = keyof typeof OP_TAGS;
export type OpTag = { [K in ServiceKey]: typeof OP_TAGS[K][number] }[ServiceKey];
export type AllTag = ServiceTag | OpTag;
export const ALL_OP_TAGS = Object.values(OP_TAGS).flatMap(a => [...a]) as readonly OpTag[];
export const ALL_TAGS = [...SERVICE_TAGS, ...ALL_OP_TAGS] as const;